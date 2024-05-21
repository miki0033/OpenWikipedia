import { useState } from "react";
import { Button, Input, Image } from "@nextui-org/react";
import { useAuthContext } from "../../hooks/useAuthContext";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuthContext();

  const handleRegister = () => {
    register(email, password);
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div>
          <Image width={150} src="./Logo.png" alt="logo" className="m-5" />
        </div>
        <div>
          <h1>Register</h1>
          <p>Sign up to continue.</p>
        </div>

        <form>
          <Input
            type="email"
            label="Email"
            variant="bordered"
            value={email}
            onValueChange={setEmail}
            defaultValue="email@example.com"
            className="max-w-xs m-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            variant="bordered"
            defaultValue="junior@nextui.org"
            value={password}
            onValueChange={setPassword}
            className="max-w-xs m-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            radius="full"
            className="bg-gradient-to-tr from-blue-500 to-yellow-500 text-white shadow-lg"
            onPress={handleRegister}
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
