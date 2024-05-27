import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="glex flex-col h-full text-center text-default-600 ">
      <Header />

      <Main children={<Outlet />} />

      <Footer></Footer>
    </div>
  );
};

export default Layout;
