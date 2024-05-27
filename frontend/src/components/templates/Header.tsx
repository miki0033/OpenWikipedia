import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";
import Logo from "../atoms/Logo";
import { useEffect, useRef, useState } from "react";
import IArticleSearch from "../../interfaces/IArticleSearch";

const Header = () => {
  const [value, setValue] = useState("");

  const [data, setData] = useState<IArticleSearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const searchCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const handelSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://it.wikipedia.org/w/rest.php/v1/search/page?q=${value}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);

      setData(result.pages);
      setVisible(true);
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
    console.log(data);
  };

  const handleClickOutside = (event: MouseEvent) => {
    console.log(searchCardRef.current);

    if (
      searchCardRef.current &&
      !searchCardRef.current.contains(event.target as Node)
    ) {
      setVisible(false);
    }
  };

  const handleLinkClick = () => {
    setVisible(false); // Chiude il div quando il link viene cliccato
  };

  useEffect(() => {
    if (visible) {
      document.addEventListener("mousedown", handleClickOutside, true);
    } else {
      document.removeEventListener("mousedown", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [visible]);

  return (
    <div id="header" className="w-full grid grid-cols-3 space-around px-8 py-4">
      {
        //TODO
      }
      <div id="logo" className="flex justify-center">
        <Logo></Logo>
      </div>
      <div id="search" className="flex flex-col justify-center relative">
        <Input
          type="text"
          label=""
          placeholder=""
          labelPlacement="outside-left"
          value={value}
          onValueChange={setValue}
          className="w-full justify-center"
          endContent={
            <Button
              isIconOnly
              color="default"
              variant="light"
              aria-label="Search"
              onPress={handelSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </Button>

            // <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        {visible && (
          <div
            id="searchCard"
            ref={searchCardRef}
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50 w-[350px] max-h-[500px] bg-default-100 border overflow-auto border-black rounded-md justify-center"
          >
            <div id="results">
              {loading ? (
                <p>Caricamento...</p>
              ) : (
                data.map((item) => (
                  <Link
                    to={`/article/${item.key}`}
                    onClick={handleLinkClick}
                    key={item.id}
                  >
                    <Card key={item.id} className="my-1 hover:bg-primary-100">
                      <CardBody>
                        <h2 className="font-bold">{item.title}</h2>
                        <p>{item.description}</p>
                      </CardBody>
                    </Card>
                  </Link>
                ))
              )}{" "}
            </div>
          </div>
        )}
      </div>
      <div id="sign" className="flex flex-row gap-4 justify-center">
        <Link to="/login">
          <Button color="primary">Login</Button>
        </Link>
        <Link to="/register">
          <Button color="primary">Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
