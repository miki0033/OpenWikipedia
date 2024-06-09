//import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen h-max text-default-600 ">
      <Header />
      <div className="flex-grow ">
        <Main children={<Outlet />} />
      </div>
      {
        //<!--<Footer></Footer>-->
      }
    </div>
  );
};

export default Layout;
