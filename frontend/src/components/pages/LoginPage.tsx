import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Logo from "../atoms/Logo";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();

  const handleLogin = () => {
    login(email, password);
  };
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
            type="email"
            label="Email"
            variant="bordered"
            defaultValue="email@example.com"
            errorMessage="Please enter a valid email"
            className="max-w-xs m-2"
            value={email}
            onValueChange={setEmail}
            onChange={(e) => setEmail(e.target.value)}
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
      </div>
    </div>
  );
};

export default LoginPage;
