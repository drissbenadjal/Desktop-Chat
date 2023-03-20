import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { getCookie } from "@/Utils/utilsCookies";
import "./HeaderBar.scss";

import UserPlusLogo from "../../assets/icons/user-plus.svg";
import VideoLogo from "../../assets/icons/video.svg";
import UsersLogo from "../../assets/icons/user-square.svg";
import CallLogo from "../../assets/icons/call.svg";
import { Link } from "react-router-dom";

export const HeaderBar = ({
  type,
  onClick,
  LinkPage,
  userFriends,
}: {
  type: string;
  onClick?: any;
  LinkPage?: string;
  userFriends: string;
}) => {
  const { logout } = useContext(AuthContext);
  const [userInfos, setUserInfos] = useState<any>([]);

  const fetchUserInfos = () => {
    fetch(`http://localhost:3001/api/user/infos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: getCookie("token") as string,
        uuid2: userFriends,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Token invalide") {
          logout();
        } else if (
          data.message === "Utilisateur introuvable" ||
          data === undefined
        ) {
        } else if (data.message === "Utilisateur trouvé") {
            setUserInfos(data);
        } else {
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (userFriends) {
      const interval = setInterval(() => {
        fetchUserInfos();
      }, 100);

      return () => clearInterval(interval);
    }
  }, [userFriends]);

  if (type == "private") {
    return (
      <div className="headerbar">
        <div className="headerbar__left">
          <button>{
            userInfos.pseudo
          }</button>
          <div className={`status ${userInfos.status}`}></div>
        </div>
        <div className="headerbar__right">
          <ul>
            <li>
              <button>
                <img className="call-logo" src={CallLogo} alt="" />
              </button>
            </li>
            <li>
              <button>
                <img className="video-logo" src={VideoLogo} alt="" />
              </button>
            </li>
            <li>
              <button>
                <img className="user-plus-logo" src={UserPlusLogo} alt="" />
              </button>
            </li>
            <li>
              <button>
                <img className="users-logo" src={UsersLogo} alt="" />
              </button>
            </li>
            <li>
              <form action="">
                <input type="text" placeholder="Search" />
              </form>
            </li>
          </ul>
        </div>
      </div>
    );
  } else if (type == "home") {
    return (
      <div className="headerbar">
        <div className="headerbar__left">
          <h4>Friends</h4>
          <ul className="headerbar__left__list">
            <li>
              <button
                onClick={() => onClick("online")}
                className={LinkPage == "online" ? "active" : ""}
              >
                Online
              </button>
            </li>
            <li>
              <button
                onClick={() => onClick("all")}
                className={LinkPage == "all" ? "active" : ""}
              >
                All
              </button>
            </li>
            <li>
              <button
                onClick={() => onClick("waiting")}
                className={LinkPage == "waiting" ? "active" : ""}
              >
                Waiting
              </button>
            </li>
            <li>
              <button
                onClick={() => onClick("blocked")}
                className={LinkPage == "blocked" ? "active" : ""}
              >
                Blocked
              </button>
            </li>
            <li>
              <button
                onClick={() => onClick("requests")}
                className={
                  LinkPage == "requests" ? "add-link active" : "add-link"
                }
              >
                Add Friend
              </button>
            </li>
          </ul>
        </div>
        <div className="headerbar__right">
          <ul></ul>
        </div>
      </div>
    );
  } else if (type == "premium") {
    return (
      <div className="headerbar">
        <div className="headerbar__left">
          <h4>Premium</h4>
        </div>
        <div className="headerbar__right">
          <ul></ul>
        </div>
      </div>
    );
  } else if (type == "server") {
    return (
      <div className="headerbar">
        <div className="headerbar__left">
          <h4>Nom salon</h4>
        </div>
        <div className="headerbar__right">
          <ul></ul>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
