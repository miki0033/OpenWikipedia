/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import IArticle from "../../interfaces/IArticle";
import parsewiki from "../../utils/WikiParser";

const ArticlePage = () => {
  const { id } = useParams();

  const [data, setData] = useState<IArticle>();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [html, setHtml] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://it.wikipedia.org/w/rest.php/v1/page/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      setData(result);
      setVisible(true);
      wikitextToHtml(result.source);
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  const wikitextToHtml = (wikitext: string) => {
    // Definisci l'URL della rotta
    const url = "http://127.0.0.1:8080/auth/convert";

    axios
      .post(url, { wikitext })
      .then((response) => {
        // Ottieni l'HTML dalla risposta
        setHtml(response.data);
        console.log("HTML ricevuto:");
        console.log({ response });
      })
      .catch((error) => {
        // Gestisci gli errori
        console.error("Errore durante la richiesta:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>ArticlePage</div>
      <div>id:{id}</div>
      <div id="article" dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
};

export default ArticlePage;
