import React, { createContext, useState, useEffect } from "react";
import { getCookie, addCookie, removeCookie } from "../Utils/utilsCookies";
import { io, Socket } from "socket.io-client";

export interface User {
  pseudo: string;
  tag: string;
  uuid?: string;
  pictureprofile?: string;
  token?: string;
}

export interface AuthContextType {
  loading: boolean;
  isAuthenticated: boolean;
  user: User;
  login: (pseudo: string, password: string) => void;
  logout: () => void;
  loginError: string;
  signup: (pseudo: string, email: string, password: string) => void;
  signupError: string;
  socket: Socket;
}

export interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  loading: true,
  isAuthenticated: false,
  user: { pseudo: "", tag: "", uuid: "", pictureprofile: "", token: "" },
  login: () => { },
  logout: () => { },
  loginError: "",
  signup: () => { },
  signupError: "",
  socket: io("https://nexuschat.alwaysdata.net"),
});

const AuthContextProvider = ({ children }: Props) => {
  const socket = io("https://nexuschat.alwaysdata.net");
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ pseudo: "", tag: "", uuid: "", pictureprofile: "" });
  const [loginError, setLoginError] = useState<string>("");
  const [signupError, setsignupError] = useState<string>("");

  useEffect(() => {
    if (!getCookie("token")) {
      setLoading(false);
      return;
    };
    fetch("https://nexuschat.alwaysdata.net/api/validtoken", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'token': getCookie("token") as string
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setIsAuthenticated(true);
          setUser({ pseudo: data.pseudo, tag: data.tag, uuid: data.uuid, pictureprofile: data.pictureprofile, token: data.token });
          socket.emit("token", getCookie("token"));
        } else {
          socket.emit("tokenlogout", getCookie("token"));
          removeCookie("token");
        }
        setLoading(false);
      }
      );
  }, []);

  const login = (email: string, password: string) => {
    if (email.trim() !== "" && password.trim() !== "") {
      fetch("https://nexuschat.alwaysdata.net/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'email': email,
          'password': password
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            setIsAuthenticated(true);
            setUser({ pseudo: data.pseudo, tag: data.tag, uuid: data.uuid, pictureprofile: data.pictureprofile, token: data.token });
            addCookie("token", data.token, 1);
            socket.emit("token", user.token);
          } else {
            setLoginError(data.message);
          }
        });
    }
  };

  const signup = (pseudo: string, email: string, password: string) => {
    if (pseudo.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
      fetch("https://nexuschat.alwaysdata.net/api/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'pseudo': pseudo,
          'email': email,
          'password': password
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "create") {
            setsignupError(data.message);
          } else {
            setsignupError(data.message);
          }
        });
    }
  };

  const logout = () => {
    socket.emit("tokenlogout", user.token);
    setIsAuthenticated(false);
    setUser({ pseudo: "", tag: "", uuid: "", pictureprofile: "", token: "" });
    removeCookie("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loginError, signup, signupError, loading, socket }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };