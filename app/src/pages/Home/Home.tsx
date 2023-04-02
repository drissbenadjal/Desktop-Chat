import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { HeaderBar } from "@/components/HeaderBar/HeaderBar";
import { AuthContext } from "../../Context/AuthContext";
import { getCookie } from "@/Utils/utilsCookies";
import "./Home.scss";

import MessageLogo from "../../assets/icons/message.svg";
import MoreLogo from "../../assets/icons/more.svg";
import CloseLogo from "../../assets/icons/close-svg.svg";
import AcceptLogo from "../../assets/icons/accept.svg";

export const Home = () => {

  const { user, logout } = useContext(AuthContext);

  const [count, setCount] = useState(0);
  const [ViewHome, setViewHome] = useState("online");
  const [Data, setData] = useState([]);
  const [addMessage, setAddMessage] = useState("");

  const handleView = (view: string) => {
    setViewHome(view);
  };

  const fetchOnline = async () => {
    if (user.token === undefined) {
      logout();
    }
    fetch("http://localhost:3001/api/friends/online", {
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
        } else if (data.number === 0) {
        } else {
          setData(data);
          setCount(data.length);
        }
      })
      .catch((err) => {
          
      });
  };

  const fetchAll = async () => {
    if (user.token === undefined) {
      logout();
    }
    fetch("http://localhost:3001/api/friends/all", {
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
        } else if (data.number === 0) {
        } else {
          setData(data);
          setCount(data.length);
        }
      })
      .catch((err) => {
        
      });
  };

  const fetchWaiting = async () => {
    fetch("http://localhost:3001/api/friends/request/waiting", {
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
        } else if (data.number === 0) {
        } else {
          setData(data);
          setCount(data.length);
        }
      })
      .catch((err) => {
          
      });
  };

  const fetchBlocked = async () => {
    fetch("http://localhost:3001/api/friends/request/blocked", {
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
        } else if (data.number === 0) {
          
        } else {
          setData(data);
          setCount(data.length);
        }
      })
      .catch((err) => {
          
      });
  };

  const handleAccept = async (uuid: string) => {
    if (user.token === undefined) {
      logout();
    }
    fetch("http://localhost:3001/api/friends/accept", {
      method: "POST",
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
        } else if (data.message === "ok") {
          fetchWaiting();
        } else {
        }
      })
      .catch((err) => {

      });
  };

  const sendRequest = async (e: any) => {
    e.preventDefault();
    const pseudo = e.target.pseudotag.value.split("#")[0];
    const tag = e.target.pseudotag.value.split("#")[1];
    console.log(pseudo, tag);
    fetch("http://localhost:3001/api/friends/request/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: user.token as string,
        pseudo: pseudo,
        tag: tag,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Token invalide") {
          logout();
        } else {
          setAddMessage(data.message);
        }
      })
      .catch((err) => {
          
      });
  };

  const BtnRequest = useRef<HTMLButtonElement>(null);
  const handleChange = (e: any) => {
    if (e.target.value.match(/^[a-zA-Z0-9]+#[0-9]{4}$/)) {
      BtnRequest.current!.disabled = false;
    } else {
      BtnRequest.current!.disabled = true;
    }
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
      setAddMessage("");
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
                              <img src={AcceptLogo} alt="accept" onClick={() => handleAccept(friend.uuid)} />
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
                  <form onSubmit={sendRequest}>
                    <input type="text" placeholder="Enter username#0000" id="pseudotag" onChange={handleChange} />
                    <input type="submit" value="Send friend request" ref={BtnRequest as any} disabled />
                  </form>
                  <p>{addMessage}</p>
                </div>
              </>
            ) : (
              <></>
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
