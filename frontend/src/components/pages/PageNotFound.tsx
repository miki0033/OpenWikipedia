import { Link, useLocation } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

const PageNotFound = () => {
  const location = useLocation();

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center bg-default-50">
      <p className="text-6xl text-center text-danger my-2">Error 404</p>
      <p className="text-4xl text-center text-danger my-2">
        No Page Found in {location.pathname}
      </p>
      <Link
        to={"/"}
        className="my-10 mx-auto flex flex-row text-lg text-center text-secondary underline"
      >
        <ArrowUturnLeftIcon className="w-6 h-6 mx-2" />
        Go back to homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
