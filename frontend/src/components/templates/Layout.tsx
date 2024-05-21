import Header from "./Header";
import Main from "./Main";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-full bg-default-50 text-center text-default-600 ">
      <Header />
      <Main children={<Outlet />} />
    </div>
  );
};

export default Layout;
