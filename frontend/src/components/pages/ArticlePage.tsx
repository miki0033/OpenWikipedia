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
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const { isLoggedIn, token } = useAuthContext();

  const [data, setData] = useState<IArticle>();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [dbResult, setDbResult] = useState<IArticle>();
  const [html, setHtml] = useState("");
  const [newHtml, setNewHtml] = useState("");
  const [dbArticle, setDbArticle] = useState("");
  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      if (isLoggedIn) {
        checkDbData(id);
      } else {
        fetchData();
      }
    }
  }, [id]);

  const checkDbData = async (id: string) => {
    setLoading(true);
    console.log(token);

    try {
      const response = await fetch(
        `http://${BACKEND_URL}/v1/getArticle/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 404) {
        fetchData();
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const result = await response.json();

        setDbResult(result);
        setDialog(true);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSaveBtn = () => {
    let isModified = false;
    if (newHtml != null) {
      setHtml(newHtml);
      isModified = true;
    }
    saveNewHtml(isModified);
  };

  function saveNewHtml(isModified: boolean) {
    //TODO:Fare la fetch per salvare l'articolo sul database
    let newArticle: IArticle;
    if (id != null) {
      if (isModified) {
        newArticle = { key: id, title: id, source: newHtml };
      } else newArticle = { key: id, title: id, source: html };

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

  const loadDbArticle = () => {
    if (dbResult) {
      setHtml(dbResult?.source);
    }
    closeDialog();
  };

  const closeDialog = () => {
    setDialog(false);
  };

  return (
    <div>
      {dialog ? (
        <>
          <div>
            <h1 className="font-bold">
              é stata trovata una copia personale dell'articolo, caricare la
              copia o l'articolo da Wikipedia?
            </h1>
            <div
              id="dialogBtn"
              className="flex flex-row gap-4 justify-center mt-8"
            >
              <Button
                color="primary"
                onPress={loadDbArticle}
                startContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                  </svg>
                }
              >
                Carica la mia copia
              </Button>
              <Button
                color="primary"
                onPress={closeDialog}
                startContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
                  </svg>
                }
              >
                Carica l'articolo da Wikipedia
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
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
                  onPress={handleSaveBtn}
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
                  defaultValue={newHtml}
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
        </>
      )}
    </div>
  );
};

export default ArticlePage;
