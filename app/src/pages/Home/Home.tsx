import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeaderBar } from "@/components/HeaderBar/HeaderBar";
import { getCookie } from "@/Utils/utilsCookies";
import "./Home.scss";

import MessageLogo from "../../assets/icons/message.svg";
import MoreLogo from "../../assets/icons/more.svg";
import CloseLogo from "../../assets/icons/close-svg.svg";

export const Home = () => {
  const [count, setCount] = useState(0);
  const [ViewHome, setViewHome] = useState("online");
  const [Data, setData] = useState([]);

  const handleView = (view: string) => {
    setViewHome(view);
  };

  const fetchOnline = async () => {
    fetch("http://localhost:3001/api/friends/online", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: getCookie("token") as string,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.number === 0) {
        } else {
          setData(data);
          setCount(data.length);
        }
      });
  };

  const fetchAll = async () => {
    fetch("http://localhost:3001/api/friends/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: getCookie("token") as string,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.number === 0) {
        } else {
          setData(data);
          setCount(data.length);
        }
      });
  };

  const fetchWaiting = async () => {
    fetch("http://localhost:3001/api/friends/request/waiting", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: getCookie("token") as string,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.number === 0) {
        } else {
          setData(data);
          setCount(data.length);
        }
      });
  };

  const fetchBlocked = async () => {
    fetch("http://localhost:3001/api/friends/request/blocked", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: getCookie("token") as string,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.number === 0) {
          console.log("error");
        } else {
          setData(data);
          setCount(data.length);
        }
      });
  };

  useEffect(() => {
    if (ViewHome === "online") {
      setCount(0);
      setData([]);
      fetchOnline();
    } else if (ViewHome === "all") {
      setCount(0);
      setData([]);
      fetchAll();
    } else if (ViewHome === "waiting") {
      setCount(0);
      setData([]);
      fetchWaiting();
    } else if (ViewHome === "blocked") {
      setCount(0);
      setData([]);
      fetchBlocked();
    } else if (ViewHome === "requests") {
      
    }
  }, [ViewHome]);

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
            ViewHome === "online" ? (
              <>
                <div className="home__content__left__header">
                  <form action="">
                    <input type="text" placeholder="Search" />
                  </form>
                </div>
                {Data.length === 0 ? (
                    <div className="none-data">
                      <h3>No friends online</h3>
                    </div>
                ) : (
                  <>
                    <div className="home__content__left__header__count">
                      <h3>ONLINE</h3>
                      <div className="separtor"></div>
                      <h3>{count}</h3>
                    </div>
                    <ul className="home__content__left__header__list">
                      {
                        Data.map((friend: any) => {
                          return (
                            <li key={friend.uuid}>
                              <Link to={`/private/${friend.uuid}`}>
                                <div className="status-container">
                                  <img src={friend.pictureprofile} alt="logo" />
                                  <div
                                    className={`status ${friend.status}`}
                                  ></div>
                                </div>
                                <div className="username-container">
                                  <p className="username">{friend.pseudo}</p>
                                  <p className="status-name">{friend.status}</p>
                                </div>
                              </Link>
                              <button>
                                <img src={MessageLogo} alt="message" />
                              </button>
                              <button className="more-button">
                                <img src={MoreLogo} alt="message" />
                              </button>
                            </li>
                          );
                        })
                      }
                    </ul>
                  </>
                )}
              </>
            ) : ViewHome === "all" ? (
              <>
                <div className="home__content__left__header"> 
                  <form action="">
                    <input type="text" placeholder="Search" />
                  </form>
                </div>
                {
                  Data.length === 0 ? (
                    <div className="none-data">
                      <h3>No friends</h3>
                    </div>
                  ) : (
                    <>
                      <div className="home__content__left__header__count">
                        <h3>ALL FRIENDS</h3>
                        <div className="separtor"></div>
                        <h3>{count}</h3>
                      </div>
                      <ul className="home__content__left__header__list">
                        {Data.map((friend: any) => {
                          return (
                            <li key={friend.uuid}>
                              <Link to={`/private/${friend.uuid}`}>
                                <div className="status-container">
                                  <img src={friend.pictureprofile} alt="logo" />
                                  <div
                                    className={`status ${friend.status}`}
                                  ></div>
                                </div>
                                <div className="username-container">
                                  <p className="username">{friend.pseudo}</p>
                                  <p className="status-name">{friend.status}</p>
                                </div>
                              </Link>
                              <button>
                                <img src={MessageLogo} alt="message" />
                              </button>
                              <button className="more-button">
                                <img src={MoreLogo} alt="message" />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )
                }
              </>
            ) : ViewHome === "waiting" ? (
              <>
                <div className="home__content__left__header">
                  <form action="">
                    <input type="text" placeholder="Search" />
                  </form>
                </div>
                {Data.length === 0 ? (
                    <div className="none-data">
                      <h3>You have no friend requests</h3>
                    </div>
                ) : (
                  <>
                    <div className="home__content__left__header__count">
                      <h3>WAITING</h3>
                      <div className="separtor"></div>
                      <h3>{count}</h3>
                    </div>
                    <ul className="home__content__left__header__list">
                      {Data.map((friend: any) => {
                        return (
                          <li key={friend.uuid}>
                            <Link to="">
                              <div className="status-container">
                                <img src={friend.pictureprofile} alt="logo" />
                                <div
                                  className={`status ${friend.status}`}
                                ></div>
                              </div>
                              <div className="username-container">
                                <p className="username">{friend.pseudo}</p>
                                <p className="status-name">
                                  Friend request sent
                                </p>
                              </div>
                            </Link>
                            <button>
                              <img src={CloseLogo} alt="delete" />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </>
            ) : ViewHome === "blocked" ? (
              <>
                <div className="home__content__left__header">
                  <form action="">
                    <input type="text" placeholder="Search" />
                  </form>
                </div>
                {Data.length === 0 ? (
                  <div className="none-data">
                    <h3>You have no blocked friends</h3>
                  </div>
                ) : (
                  <>
                    <div className="home__content__left__header__count">
                      <h3>BLOCKED</h3>
                      <div className="separtor"></div>
                      <h3>{count}</h3>
                    </div>
                    <ul className="home__content__left__header__list">
                      {
                        Data.map((friend: any) => {
                          return (
                            <li key={friend.uuid}>
                              <Link to="">
                                <div className="status-container">
                                  <img
                                    src={friend.pictureprofile}
                                    alt="logo"
                                  />
                                  <div className={`status ${friend.status}`}></div>
                                </div>
                                <div className="username-container">
                                  <p className="username">{friend.pseudo}</p>
                                </div>
                              </Link>
                              <button>
                                <img src={CloseLogo} alt="UnBlocked" />
                              </button>
                            </li>
                          );
                        })
                      }
                    </ul>
                  </>
                )}
              </>
            ) : ViewHome === "requests" ? (
              <>
                <div className="home__content__left__header__add">
                  <h2>
                    ADD FRIENDS <span>+</span>
                  </h2>
                  <p>Add friends by username and tag.</p>
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
