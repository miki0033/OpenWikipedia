import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex  flex-col h-screen text-center text-default-600 ">
      <Header />
      <div className="flex-grow">
        <Main children={<Outlet />} />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
