import { ReactElement } from "react";

const Main = ({ children }: { children: ReactElement }) => {
  return <div className="h-full">{children}</div>;
};

export default Main;
