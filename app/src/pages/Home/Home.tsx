import { useState } from "react";
import { Link } from "react-router-dom";
import { HeaderBar } from "@/components/HeaderBar/HeaderBar";
import "./Home.scss";

import MessageLogo from "../../assets/icons/message.svg";
import MoreLogo from "../../assets/icons/more.svg";
import CloseLogo from "../../assets/icons/close-svg.svg";

export const Home = () => {
  const [count, setCount] = useState(0);
  const [ViewHome, setViewHome] = useState("online");

  const handleView = (view: string) => {
    setViewHome(view);
  };

  return (
    <div className="home">
      <HeaderBar
        type="home"
        onClick={(view: string) => handleView(view)}
        LinkPage={
          ViewHome === "online"
            ? "online"
            : ViewHome === "all"
              ? "all"
              : ViewHome === "waiting"
                ? "waiting"
                : ViewHome === "blocked"
                  ? "blocked"
                  : ViewHome === "requests"
                    ? "requests"
                    : "online"
        }
      />
      <div className="home__content">
        <div className="home__content__left">
          {
            //si ViewHome === a online alors on affiche le contenu online si c'est all on affiche le contenu all etc...
            ViewHome === "online" ? (
              <>
                <div className="home__content__left__header">
                  <form action="">
                    <input type="text" placeholder="Search" />
                  </form>
                </div>
                <div className="home__content__left__header__count">
                  <h3>ONLINE</h3>
                  <div className="separtor"></div>
                  <h3>50</h3>
                </div>
                <ul className="home__content__left__header__list">
                  <li>
                    <Link to="/private/1">
                      <div className="status-container">
                        <img
                          src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png"
                          alt="logo"
                        />
                        <div className="status online"></div>
                      </div>
                      <div className="username-container">
                        <p className="username">Username</p>
                        <p className="status-name">Online</p>
                      </div>
                    </Link>
                    <button>
                      <img src={MessageLogo} alt="message" />
                    </button>
                    <button className="more-button">
                      <img src={MoreLogo} alt="message" />
                    </button>
                  </li>
                </ul>
              </>
            ) : ViewHome === "all" ? (
              <>
                <div className="home__content__left__header">
                  <form action="">
                    <input type="text" placeholder="Search" />
                  </form>
                </div>
                <div className="home__content__left__header__count">
                  <h3>ALL FRIENDS</h3>
                  <div className="separtor"></div>
                  <h3>50</h3>
                </div>
                <ul className="home__content__left__header__list">
                  <li>
                    <Link to="/private/1">
                      <div className="status-container">
                        <img
                          src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png"
                          alt="logo"
                        />
                        <div className="status offline"></div>
                      </div>
                      <div className="username-container">
                        <p className="username">Username</p>
                        <p className="status-name">Online</p>
                      </div>
                    </Link>
                    <button>
                      <img src={MessageLogo} alt="message" />
                    </button>
                    <button className="more-button">
                      <img src={MoreLogo} alt="message" />
                    </button>
                  </li>
                </ul>
              </>
            ) : ViewHome === "waiting" ? (
              <>
                <div className="home__content__left__header">
                  <form action="">
                    <input type="text" placeholder="Search" />
                  </form>
                </div>
                <div className="home__content__left__header__count">
                  <h3>WAITING</h3>
                  <div className="separtor"></div>
                  <h3>1</h3>
                </div>
                <ul className="home__content__left__header__list">
                  <li>
                    <Link to="/private/1">
                      <div className="status-container">
                        <img
                          src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png"
                          alt="logo"
                        />
                        <div className="status offline"></div>
                      </div>
                      <div className="username-container">
                        <p className="username">Username</p>
                        <p className="status-name">Friend request sent</p>
                      </div>
                    </Link>
                    <button>
                      <img src={CloseLogo} alt="delete" />
                    </button>
                  </li>
                </ul>
              </>
            ) : ViewHome === "blocked" ? (
              <>
                <div className="home__content__left__header">
                  <form action="">
                    <input type="text" placeholder="Search" />
                  </form>
                </div>
                <div className="home__content__left__header__count">
                  <h3>BLOCKED</h3>
                  <div className="separtor"></div>
                  <h3>1</h3>
                </div>
                <ul className="home__content__left__header__list">
                  <li>
                    <Link to="/private/1">
                      <div className="status-container">
                        <img
                          src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png"
                          alt="logo"
                        />
                        <div className="status offline"></div>
                      </div>
                      <div className="username-container">
                        <p className="username">Username</p>
                      </div>
                    </Link>
                    <button>
                      <img src={CloseLogo} alt="UnBlocked" />
                    </button>
                  </li>
                </ul>
              </>
            ) : ViewHome === "requests" ? (
              <>
                <div className="home__content__left__header__add">
                  <h2>
                    ADD FRIENDS <span>+</span>
                  </h2>
                  <p>
                    Add friends by username and tag.
                  </p>
                  <form action="">
                    <input type="text" placeholder="Enter username#0000" />
                    <input type="submit" value="Send friend request" disabled />
                  </form>
                </div>
              </>
            ) : (
              <h1>Online</h1>
            )
          }
        </div>
        <div className="home__content__right">
          <h1>Activities</h1>
        </div>
      </div>
    </div>
  );
};
