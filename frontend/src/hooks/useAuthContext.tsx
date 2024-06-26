import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import IUser from "../interfaces/IUser";
import ISignupRequest from "../interfaces/ISignupRequest";

// Definiamo il tipo per il contesto di autenticazione
interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => void;
  register: (object: ISignupRequest) => void;
  logout: () => void;
  token: string;
  user?: IUser;
}

// Creiamo un contesto vuoto con un tipo specifico
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Creiamo il provider per il contesto di autenticazione
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = async (username: string, password: string) => {
    const request = {
      username: username,
      password: password,
    };
    console.log(JSON.stringify(request));

    try {
      const response = await fetch("http://localhost:8080/auth/v1/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const result = await response.json();

      if (response.ok) {
        console.log(`Login successful for username: ${username}`);
        setIsLoggedIn(true);
        setUser(result.user);
        setToken(result.token);
      } else {
        console.error("Login failed");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoggedIn(false);
    }
  };

  const register = async (request: ISignupRequest) => {
    console.log(JSON.stringify({ request }));

    try {
      const response = await fetch("http://localhost:8080/auth/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: request.username,
          email: request.email,
          password: request.password,
          firstName: request.firstName,
          lastName: request.lastName,
        }),
      });
      const result = await response.json();

      if (response.ok) {
        console.log(`Signup successful for username: ${request.username}`);
        setIsLoggedIn(true);
        setUser(result);
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const logout = () => {
    console.log("Logout");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, register, logout, user, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Creiamo un hook personalizzato per utilizzare il contesto di autenticazione
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
