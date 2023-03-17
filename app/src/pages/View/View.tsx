import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

import { Link } from "react-router-dom";

import { SideBar } from "@/components/SideBar/SideBar";
import { UtilsBar } from "@/components/UtilsBar/UtilsBar";

import { Login } from "../Login/Login";
import { Signup } from "../Signup/Signup";
import { Home } from "../Home/Home";
import { Server } from "../Server/Server";
import { Private } from "../Private/Private";
import { Premium } from "../Premium/Premium";

import "./View.scss";

export const View = ({ page }: any) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  if (!isAuthenticated) {
    if (page === "signup") {
      return (
        <>
          <main>
            <Signup />
          </main>
        </>
      );
    } else {
      return (
        <main>
          <Login />
        </main>
      );
    }
  } else {
    if (page === "home" || page === undefined) {
      return (
        <>
          <main>
            <SideBar />
            <UtilsBar infos="friends" />
            <div className="View">
              <Home />
            </div>
          </main>
        </>
      );
    } else if (page === "server") {
      return (
        <>
          <main>
            <SideBar />
            <UtilsBar infos="server" />
            <div className="View">
              <Server />
            </div>
          </main>
        </>
      );
    } else if (page === "private") {
      return (
        <>
          <main>
            <SideBar />
            <UtilsBar infos="friends" />
            <div className="View">
              <Private />
            </div>
          </main>
        </>
      );
    } else if (page === "premium") {
      return (
        <>
          <main>
            <SideBar />
            <UtilsBar infos="friends" />
            <div className="View">
              <Premium />
            </div>
          </main>
        </>
      );
    } else {
      return (
        <>
          <main>
            <SideBar />
            <div className="View">
              <h1>404</h1>
              <p>Page not found</p>
              <Link to="/home">Go to home</Link>
            </div>
          </main>
        </>
      );
    }
  }
};
