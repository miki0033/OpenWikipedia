import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Logo from "../atoms/Logo";
import ISignupRequest from "../../interfaces/ISignupRequest";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { register } = useAuthContext();

  const handleRegister = () => {
    const request: ISignupRequest = {
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
    };

    register(request);
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div>
          <Logo></Logo>
        </div>
        <div className="m-4">
          <h1>Register</h1>
          <p>Sign up to continue.</p>
        </div>
        <div id="formdiv" className="mb-32">
          <form className="flex flex-col gap-3 justify-center items-center">
            <Input
              type="text"
              label="Username"
              labelPlacement="inside"
              variant="bordered"
              value={username}
              onValueChange={setUsername}
              defaultValue="Username@example.com"
              className="max-w-xs"
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="flex flex-row gap-4">
              <Input
                type="text"
                label="FirstName"
                labelPlacement="inside"
                variant="bordered"
                value={firstName}
                onValueChange={setFirstName}
                defaultValue="FirstName@example.com"
                className="max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                type="text"
                label="LastName"
                labelPlacement="inside"
                variant="bordered"
                value={lastName}
                onValueChange={setLastName}
                defaultValue="LastName@example.com"
                className="max-w-xs"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <Input
              type="email"
              label="Email"
              labelPlacement="inside"
              variant="bordered"
              value={email}
              onValueChange={setEmail}
              defaultValue="email@example.com"
              className="max-w-xs"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              labelPlacement="inside"
              variant="bordered"
              defaultValue=""
              value={password}
              onValueChange={setPassword}
              className="max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              radius="lg"
              className="bg-gradient-to-tr bg-primary-500 text-white shadow-lg"
              onPress={handleRegister}
            >
              Sign up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
