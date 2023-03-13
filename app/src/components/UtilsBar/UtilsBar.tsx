import { Link, useLocation } from "react-router-dom";

import "./UtilsBar.scss";

import { ChatStatus } from "../ChatStatus/ChatStatus";
import CloseIcon from "../../assets/icons/close-svg.svg";

export const UtilsBar = ({ infos }: any) => {
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
              to="/Premium"
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
                <li
                  className={
                    useLocation().pathname === "/private/1" ? "active-pm" : ""
                  }
                >
                  <Link to="/private/1">
                    <div className="status-container">
                      <img
                        src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png"
                        alt="logo"
                      />
                      <div className="status dnd"></div>
                    </div>
                    <p>Username</p>
                  </Link>
                  <button className="close-pm">
                    <img src={CloseIcon} alt="" />
                  </button>
                </li>
                <li
                  className={
                    useLocation().pathname === "/private/2" ? "active-pm" : ""
                  }
                >
                  <Link to="/private/2">
                    <div className="status-container">
                      <img
                        src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png"
                        alt="logo"
                      />
                      <div className="status online"></div>
                    </div>
                    <p>Username</p>
                  </Link>
                  <button className="close-pm">
                    <img src={CloseIcon} alt="" />
                  </button>
                </li>
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
        <h1>Server</h1>
        <ChatStatus />
      </div>
    );
  }
};
