import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { getCookie } from "@/Utils/utilsCookies";

import "./UtilsBar.scss";

import { ChatStatus } from "../ChatStatus/ChatStatus";
import CloseIcon from "../../assets/icons/close-svg.svg";
import ArrowDownSquare from "../../assets/icons/arrow-down-square.svg";
import UsersIcon from "../../assets/icons/users.svg";
import WalletIcon from "../../assets/icons/wallet.svg";

export const UtilsBar = ({ infos }: any) => {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);
  const [currentPrivateChat, setCurrentPrivateChat] = useState<any>([]);

  const fetchCurrentPrivateChat = () => {
    if (user.token === undefined) {
      logout();
    }
    fetch(`http://localhost:3001/api/private/current`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: user.token as string,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Token invalide") {
          logout();
        } else if (
          data.message === "Aucun chat" ||
          data.message === "Une erreur est survenue" ||
          data === undefined
        ) {
          setCurrentPrivateChat([]);
        } else {
          setCurrentPrivateChat(data);
        }
      })
      .catch((err) => { });
  };

  useEffect(() => {
    if (infos === "friends") {
      const interval = setInterval(() => {
        fetchCurrentPrivateChat();
      }, 100);

      return () => clearInterval(interval);
    }
  }, [infos]);

  const handleClosePrivateChat = (uuid: string) => {
    if (user.token === undefined) {
      logout();
    }
    navigate("/");
    setTimeout(() => {
      fetch(`http://localhost:3001/api/private/current/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          token: user.token as string,
          uuid: uuid,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Token invalide") {
            logout();
          } else if (data.message === "Chat supprimé") {
            fetchCurrentPrivateChat();
          } else {
            fetchCurrentPrivateChat();
          }
        })
        .catch((err) => { });
    }, 100);
  };

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
              <img src={UsersIcon} alt="" />
              <p>Friends</p>
            </Link>
            <Link
              to="/wallet"
              className={useLocation().pathname === "/wallet" ? "active" : ""}
            >
              <img src={WalletIcon} alt="" />
              <p>Wallet</p>
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
                  currentPrivateChat.map((chat: any, index: number) => {
                    return (
                      <li
                        key={index}
                        className={
                          useLocation().pathname === `/private/${chat.uuid}`
                            ? "active-pm"
                            : ""
                        }
                      >
                        <Link to={`/private/${chat.uuid}`}>
                          <div className="status-container">
                            <img src={chat.pictureprofile} draggable="false" alt="logo" />
                            <div className={`status ${chat.status}`}></div>
                          </div>
                          <p>{chat.pseudo}</p>
                        </Link>
                        <button
                          className="close-pm"
                          value={chat.uuid}
                          onClick={(e) => {
                            handleClosePrivateChat(e.currentTarget.value);
                          }}
                        >
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
