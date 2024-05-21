import { createContext, useContext, useState, ReactNode } from "react";

// Definiamo il tipo per il contesto di autenticazione
interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => void;
  register: (username: string, password: string) => void;
  logout: () => void;
}

// Creiamo un contesto vuoto con un tipo specifico
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Creiamo il provider per il contesto di autenticazione
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = (username: string, password: string) => {
    //TODO
    // Implementa la logica di login (es. chiamata API)
    console.log(`Login with username: ${username}`);
    setIsLoggedIn(true);
  };

  const register = (username: string, password: string) => {
    //TODO
    // Implementa la logica di registrazione (es. chiamata API)
    console.log(`Register with username: ${username}`);
    setIsLoggedIn(true);
  };

  const logout = () => {
    //TODO
    // Implementa la logica di logout
    console.log("Logout");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
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
