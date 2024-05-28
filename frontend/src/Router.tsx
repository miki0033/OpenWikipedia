import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/templates/Layout";
import PageNotFound from "./components/pages/PageNotFound";
import Login from "./components/pages/LoginPage";
import Register from "./components/pages/RegisterPage";
import Home from "./components/pages/HomePage";

//import PrivateRoute from "./hooks/PrivateRoute";
//import { useAuthContext } from "./hooks/useAuthContext";
import ArticlePage from "./components/pages/ArticlePage";
import ProfilePage from "./components/pages/ProfilePage";

const App: React.FC = () => {
  //const { isLoggedIn } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            //<PrivateRoute isAuthenticated={isLoggedIn}>

            //TODO
            <Home />

            //</PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/article/:id" element={<ArticlePage />} />
        <Route
          path="/profile"
          element={
            //<PrivateRoute isAuthenticated={isLoggedIn}>

            //TODO
            <ProfilePage />

            //</PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
