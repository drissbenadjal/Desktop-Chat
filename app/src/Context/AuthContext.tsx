import React, { createContext, useState, useEffect } from "react";

export interface User {
  pseudo: string;
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User;
  login: (pseudo: string, password: string) => void;
  logout: () => void;
}

export interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: { pseudo: "", password: "" },
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ pseudo: "", password: "" });

  useEffect(() => {
    // Check if user is logged in
    // If so, set isAuthenticated to true
    // You can use a library like JWT or Firebase Authentication to implement this
  }, []);

  const login = (pseudo: string, password: string) => {
    if (pseudo.trim() !== "" && password.trim() !== "") {
      setIsAuthenticated(true);
      setUser({ pseudo, password });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser({ pseudo: "", password: "" });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
