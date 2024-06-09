import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import IPageable from "../../interfaces/IPageable";
import { Card, CardHeader, CardFooter, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { PressEvent } from "@react-types/shared";

const ProfilePage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const { user, token } = useAuthContext();
  const [dbArticlesPage, setDbArticlesPage] = useState<IPageable>();
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles(page);
  }, [page]);

  const changePage = (event: PressEvent) => {
    const target = event.target as HTMLElement;
    const index = target?.id;
    console.log(index);
    if (index) {
      setPage(index as unknown as number);
    }
  };

  const getArticles = async (page: number) => {
    console.log(page);

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/v1/getArticles/${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const articlesPage = await response.json();
      console.log(articlesPage);
      setDbArticlesPage(articlesPage);
      setIsLoading(false);
      //databaseArticles = articlesPage.content;

      //setDbArticles(articles);
    } catch (error) {
      console.error("Fetch error:", error);
      // Gestisci l'errore in base alle tue esigenze
      return null;
    }
  };

  return isLoading ? (
    <div id="skeleton" className="animate-pulse">
      <div className="w-full h-screen flex flex-row">
        <div id="sx" className="bg-primary-50 w-1/4 flex flex-col gap-4 pt-20">
          <div>
            <div className="bg-gray-300 h-10 w-40 rounded"></div>
          </div>
          <div>
            <div className="bg-gray-300 h-10 w-40 rounded"></div>
          </div>
        </div>
        <div id="dx" className="bg-primary-100 w-3/4 pt-20">
          <div className="flex flex-col items-center gap-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-full">
                <div className="flex gap-3 items-center">
                  <div className="bg-gray-300 h-8 w-1/2 rounded"></div>
                </div>
                <div className="bg-gray-300 h-8 rounded mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-full min-h-screen flex flex-row">
      <div id="sx" className="bg-primary-50 w-1/4  flex flex-col gap-4 pt-20">
        <div>
          <p className="text-2xl font-bold text-bleck-600">{user?.username}</p>
        </div>
        <div>
          <div> Articoli salvati: {dbArticlesPage?.totalElements}</div>
        </div>
      </div>
      <div id="dx" className="bg-primary-100 w-3/4 pt-20">
        {dbArticlesPage?.totalElements === 0 ? (
          <p>Non hai salvato nessun articolo</p>
        ) : (
          <div className="flex flex-col items-center gap-8">
            {dbArticlesPage?.content.map((element) => (
              <Card
                key={element.key}
                className="mx-32 w-2/5 border-2 border-black"
              >
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">{element.title}</p>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Link to={`http://${BASE_URL}/article/${element.key}`}>
                    <p className="flex flex-row text-blue-600 hover:underline hover:bg-blue-100 hover:text-blue-800 cursor-pointer">
                      Vai al articolo
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 mx-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </p>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div id="pages" className="flex flex-row gap-2 justify-center m-4">
          {Array.from(
            { length: dbArticlesPage?.totalPages || 0 },
            (_, index) => (
              <Button
                key={index}
                id={index as unknown as string}
                className="w-12 h-12 text-center items-center bg-white border border-black rounded-md flex justify-center"
                onPress={changePage}
              >
                {index + 1}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
