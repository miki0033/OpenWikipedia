/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import IArticle from "../../interfaces/IArticle";
import parsewiki from "../../utils/WikiParser";
import { Button, Textarea } from "@nextui-org/react";
import { useAuthContext } from "../../hooks/useAuthContext";

const ArticlePage = () => {
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { isLoggedIn, token } = useAuthContext();

  const [data, setData] = useState<IArticle>();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [html, setHtml] = useState("");
  const [newHtml, setNewHtml] = useState("");
  const [isEditMode, setEditMode] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://it.wikipedia.org/w/rest.php/v1/page/${id}/html`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let htmlContent = await response.text(); // Ottieni il contenuto HTML come stringa
      console.log(htmlContent); // Stampa il contenuto HTML sulla console
      htmlContent = replaceString(
        htmlContent,
        "it.wikipedia.org/wiki",
        BASE_URL + "/article"
      );
      setHtml(htmlContent); // Imposta il contenuto HTML nella variabile di stato
      /*
      const result = await response.json();

      setData(result);
      setVisible(true);
      wikitextToHtml(result);*/
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  function replaceString(
    input: string,
    searchValue: string,
    replaceValue: string
  ): string {
    return input.replace(new RegExp(searchValue, "g"), replaceValue);
  }
  function startEditMode() {
    setNewHtml(html);
    setEditMode(true);
  }
  function endEditMode() {
    setEditMode(false);
  }

  const handleChangeTextArea = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewHtml(event.target.value);
  };

  function saveNewHtml() {
    setHtml(newHtml);
    //TODO:Fare la fetch per salvare l'articolo sul database
    let newArticle: IArticle;
    if (id != null) {
      newArticle = { key: id, title: id, source: newHtml };

      console.log(JSON.stringify(newArticle));

      fetch("http://localhost:8080/v1/saveArticle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newArticle),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Successfully saved the article
          endEditMode();
        })
        .catch((error) => {
          // Handle the error
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }

  useEffect(() => {
    fetchData();
    console.log(id);
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex justify-end h-16">
          <div id="editModeBtn" className="flex gap-4 items-center mr-8">
            {isEditMode ? (
              <Button
                color="danger"
                onPress={endEditMode}
                startContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.47 2.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H9a5.25 5.25 0 1 0 0 10.5h3a.75.75 0 0 1 0 1.5H9a6.75 6.75 0 0 1 0-13.5h10.19l-4.72-4.72a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
                Annulla
              </Button>
            ) : (
              <Button
                color="warning"
                onPress={startEditMode}
                startContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                  </svg>
                }
              >
                Modifica
              </Button>
            )}

            <Button
              color="success"
              onPress={saveNewHtml}
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Salva
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex flex-col w-full h-screen">
        {isEditMode ? (
          <div
            id="editArticle"
            className="flex flex-col  w-4/5 h-full mx-auto "
          >
            <textarea
              className="w-full h-full p-4 border rounded"
              value={newHtml}
              onChange={handleChangeTextArea}
            ></textarea>
          </div>
        ) : (
          <div
            id="article"
            className="flex flex-col mx-auto  w-4/5"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;
