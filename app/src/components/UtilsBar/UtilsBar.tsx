import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { getCookie } from "@/Utils/utilsCookies";

import "./UtilsBar.scss";

import { ChatStatus } from "../ChatStatus/ChatStatus";
import CloseIcon from "../../assets/icons/close-svg.svg";
import ArrowDownSquare from "../../assets/icons/arrow-down-square.svg";

export const UtilsBar = ({ infos }: any) => {
  const { logout } = useContext(AuthContext);

  const [currentPrivateChat, setCurrentPrivateChat] = useState<any>([]);

  // const fetchCurrentPrivateChat = () => {
  //   fetch(`http://localhost:3001/api/private/current`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: new URLSearchParams({
  //       token: getCookie("token") as string,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.message === "Token invalide") {
  //         logout();
  //       } else {
  //         setCurrentPrivateChat(data);
  //         console.log(data);
  //       }
  //     });
  // };
  // useEffect(() => {
  //   fetchCurrentPrivateChat();
  //   setInterval(() => {
  //     fetchCurrentPrivateChat();
  //   }, 1000);
  // }, [getCookie("token")]);

  if (infos === "friends") {
    return (
      <div className="utilsbar">
        <div className="utilsbar-header">
          <form action="">
            <input type="text" placeholder="Search" />
          </form>
        </div>
        <div className="utilsbar-container">
          <div className="utilsbar-action">
            <Link
              to="/home"
              className={
                useLocation().pathname === "/home" ||
                useLocation().pathname === "/"
                  ? "active"
                  : ""
              }
            >
              <p>Friends</p>
            </Link>
            <Link
              to="/premium"
              className={useLocation().pathname === "/premium" ? "active" : ""}
            >
              <p>Premium</p>
            </Link>
          </div>
          <div className="utilsbar-friend">
            <div className="utilsbar-friend__top">
              <ul>
                <li>
                  <p>MESSAGES PRIVÉS</p>
                </li>
                <li>
                  <button>+</button>
                </li>
              </ul>
            </div>
            <div className="utilsbar-friend__bottom">
              <ul>
                {currentPrivateChat &&
                  currentPrivateChat.map((chat: any) => {
                    return (
                      <li
                        key={chat.uuid}
                        className={
                          useLocation().pathname === `/private/${chat.uuid}`
                            ? "active-pm"
                            : ""
                        }
                      >
                        <Link to={`/private/${chat.uuid}`}>
                          <div className="status-container">
                            <img src={chat.pictureprofile} alt="logo" />
                            <div className={`status ${chat.status}`}></div>
                          </div>
                          <p>{chat.pseudo}</p>
                        </Link>
                        <button className="close-pm">
                          <img src={CloseIcon} alt="" />
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
        <ChatStatus />
      </div>
    );
  } else if (infos === "server") {
    return (
      <div className="utilsbar">
        <div className="utilsbar-header__server">
          <button>
            <p>Server Name</p>
            <img src={ArrowDownSquare} alt="" />
          </button>
        </div>
        <div className="utilsbar-chanels">
          <div className="utilsbar-chanels__group">
            <button className="action__header">
              <img src={ArrowDownSquare} alt="" />
              <p>Text Chanels</p>
            </button>
            <ul>
              <li>
                <button>
                  <p># General</p>
                </button>
              </li>
              <li>
                <button>
                  <p># General</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <ChatStatus />
      </div>
    );
  } else {
    return <></>;
  }
};
