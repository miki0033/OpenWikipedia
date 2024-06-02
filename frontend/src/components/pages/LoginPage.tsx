import { useEffect, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Logo from "../atoms/Logo";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(username, password);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div>
          <Logo></Logo>
        </div>
        <div>
          <h1>Login</h1>
          <p>Sign in to continue.</p>
        </div>

        <form>
          <Input
            type="text"
            label="Username"
            variant="bordered"
            defaultValue="Username@example.com"
            errorMessage="Please enter a valid Username"
            className="max-w-xs m-2"
            value={username}
            onValueChange={setUsername}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            variant="bordered"
            defaultValue=""
            className="max-w-xs m-2"
            value={password}
            onValueChange={setPassword}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            radius="lg"
            className="bg-gradient-to-tr bg-primary-500 text-white shadow-lg"
            onPress={handleLogin}
          >
            Sign In
          </Button>
        </form>

        <Link to={"/login"}>
          <div className="p-6 ">
            <p className="text-primary-400 hover:underline underline-offset-4 hover:decoration-solid">
              Non sei registrato? Registrati qui
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
