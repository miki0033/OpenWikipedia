import { useEffect, useState } from "react";
import { Bars4Icon } from "@heroicons/react/24/outline";
import ILink from "../../interfaces/ILink";
import { Link } from "react-router-dom";

function Sidebar(props: { linkList: ILink[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const sidebarElement = document.getElementById("sidebar");
    const closeSidebar = (e: MouseEvent) => {
      const target = e.target as Element;
      // Controlla se il click è all'interno della sidebar o su un link al suo interno
      if (isOpen && sidebarElement && !sidebarElement.contains(target)) {
        setIsOpen(false);
      }
    };
    document?.addEventListener("mousedown", closeSidebar);
    return () => {
      document?.removeEventListener("mousedown", closeSidebar);
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex justify-between items-center px-4 py-3">
        <button className=" focus:outline-none" onClick={toggleSidebar}>
          <Bars4Icon className="w-6 h-6 mx-2"></Bars4Icon>
        </button>
      </div>
      <div
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 transition-all duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="mt-6">
          {props.linkList.map((li: ILink, idx: number) => {
            return (
              <Link key={idx} to={li.href}>
                <li className="px-4 py-2 hover:bg-gray-700 text-white cursor-pointer">
                  {li.text}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
