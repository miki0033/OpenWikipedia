import ReactDOM from "react-dom/client";
import RouterApp from "./Router.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <NextUIProvider>
        <RouterApp />
      </NextUIProvider>
    </BrowserRouter>
  </AuthProvider>
);
