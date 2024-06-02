import { useAuthContext } from "../../hooks/useAuthContext";
import IArticle from "../../interfaces/IArticle";

const ProfilePage = () => {
  const databaseArticles: IArticle[] = [];

  const { user } = useAuthContext();

  return (
    <div className="w-full h-full flex flex-row">
      <div id="sx" className="bg-primary-50 w-1/4  flex flex-col gap-4 pt-20">
        <div>
          <p>{user?.username}</p>
        </div>
        <div>
          <div> Articoli salvati: {databaseArticles.length}</div>
          <div> Articoli cercati recentemente:</div>
          {databaseArticles.map((element) => {
            return <div key={element.id}>{element.title}</div>;
          })}
        </div>
      </div>
      <div id="dx" className="bg-primary-100 w-3/4 pt-20">
        {databaseArticles.length === 0 ? (
          <p>Non hai salvato nessun articolo</p>
        ) : (
          //todo
          databaseArticles.map((element) => {
            return <div key={element.id}>{element.title}</div>;
          })
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
