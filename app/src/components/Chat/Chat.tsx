import React, { useEffect, useRef, useState, useContext, useMemo } from "react";
import "./Chat.scss";
import "./PopupAction.scss";
import { AuthContext } from "@/Context/AuthContext";
import { getCookie } from "@/Utils/utilsCookies";
import { ChatBar } from "../ChatBar/ChatBar";

import beanLogo from "@/assets/icons/delete.svg";
import editLogo from "@/assets/icons/edit.svg";

export const Chat = ({ userFriends, serverId }: any) => {
  const { logout, user } = useContext(AuthContext);

  const [userInfos, setUserInfos] = useState<any>([]);
  const [currentPrivateChat, setCurrentPrivateChat] = useState([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const fetchUserInfos = () => {
    fetch(`http://localhost:3001/api/user/infos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: getCookie("token") as string,
        uuid2: userFriends as string,
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
      .catch((err) => { });
  };

  useEffect(() => {
    if (userFriends) {
      const interval = setInterval(() => {
        fetchUserInfos();
      }, 100);

      return () => clearInterval(interval);
    }
  }, [userFriends]);

  const fetchPrivateChat = () => {
    fetch(`http://localhost:3001/api/private`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: getCookie("token") as string,
        uuid2: userFriends as string,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Token invalide") {
          logout();
        } else if (data.message === "Aucun message") {
          setCurrentPrivateChat([]);
        } else {
          setCurrentPrivateChat(data);
        }
      });
  };

  const fetchChatServer = () => {
    console.log("fetch " + serverId);
  };

  useEffect(() => {
    if (userFriends === undefined) return;
    const interval = setInterval(() => {
      fetchPrivateChat();
    }, 100);

    return () => clearInterval(interval);
  }, [userFriends]);

  useEffect(() => {
    if (serverId === undefined) return;
    const interval = setInterval(() => {
      fetchChatServer();
    }, 100);

    return () => clearInterval(interval);
  }, [serverId]);

  const sendMessage = (message: string) => {
    if (message.trim() === "") return;
    fetch(`http://localhost:3001/api/private/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: getCookie("token") as string,
        uuid2: userFriends as string,
        message: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Token invalide") {
          logout();
        } else if (data.message === "Message envoyé") {
          fetchPrivateChat();
        }
      });
  };

  const popupRef = useRef<HTMLDivElement>(null);
  const popupChildRef = useRef<HTMLDivElement>(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupId, setPopupId] = useState("");

  const handleCancelPopup = () => {
    window.removeEventListener("click", handleClickOutside);
    popupRef.current?.classList.remove("active");
    setPopupMessage("");
    setPopupId("");
  };

  const handleClickOutside = (event: any) => {
    if (popupChildRef.current?.contains(event.target)) {
      if (event.target.id === "cancel-popup") {
        handleDeleteMessage(popupMessage, popupId);
      } else if (event.target.id === "delete-popup") {
        handleCancelPopup();
      }
    } else {
      handleCancelPopup();
    }
  };

  const handlePopupAction = (message: string, id: any) => {
    popupRef.current?.classList.add("active");
    setPopupMessage(message);
    setPopupId(id);
    setTimeout(() => {
      window.addEventListener("click", handleClickOutside);
    }, 1);
  };

  const handleDeleteMessage = (message: string, id: any) => {
    fetch(`http://localhost:3001/api/private/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: getCookie("token") as string,
        uuid2: userFriends as string,
        idMessage: id,
        message: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleCancelPopup();
      });
  };

  const [editMessage, setEditMessage] = useState("");

  const handleEditMessage = (index: number, messageData: string) => {
    const message = document.querySelector(
      `p[message-id="message-${index}"]`
    ) as HTMLParagraphElement;

    const input = document.querySelector(
      `form[edit-id="edit-${index}"]`
    ) as HTMLInputElement;

    setEditMessage(messageData);

    message.classList.add("hidden");
    input.classList.remove("hidden");

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        handleCloseEditMessage(index);
        window.removeEventListener("keydown", handleCloseEditMessage as any);
      }
    });
  };

  const handleCloseEditMessage = (index: number) => {
    const message = document.querySelector(
      `p[message-id="message-${index}"]`
    ) as HTMLParagraphElement;

    const input = document.querySelector(
      `form[edit-id="edit-${index}"]`
    ) as HTMLInputElement;

    setEditMessage("");

    message.classList.remove("hidden");
    input.classList.add("hidden");
  };

  const handleCloseAllEditMessage = () => {
    const messages = document.querySelectorAll(
      "p[message-id]"
    ) as NodeListOf<HTMLParagraphElement>;
    const inputs = document.querySelectorAll(
      "form[edit-id]"
    ) as NodeListOf<HTMLInputElement>;

    messages.forEach((message) => {
      message.classList.remove("hidden");
    });

    inputs.forEach((input) => {
      input.classList.add("hidden");
    });
  };

  const handleChangeInput = (e: any) => {
    setEditMessage(e.target.value);
  };

  const submitEditMessage = (message: string, id: any, e: any) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/private/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: getCookie("token") as string,
        uuid2: userFriends as string,
        idMessage: id,
        message: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleCloseAllEditMessage();
      });
  };

  if (userFriends !== undefined) {
    return (
      <>
        <div className="chat">
          <div className="popup__action" ref={popupRef}>
            <div className="popup__action__container" ref={popupChildRef}>
              <div className="popup__firstpart">
                <div className="popup__action__header">
                  <h2>Delete message</h2>
                  <p>Are you sure you want to delete this message?</p>
                </div>
                <div className="popup__action__body">
                  <p>{popupMessage}</p>
                </div>
              </div>
              <div className="popup__action__footer">
                <ul>
                  <li>
                    <button className="cancel" id="cancel-popup">
                      Cancel
                    </button>
                  </li>
                  <li>
                    <button
                      id="delete-popup"
                      className="accept"
                      onClick={() => handleDeleteMessage(popupMessage, popupId)}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="message-container">
            {userInfos.length !== 0 && (
              <div className="start__conv">
                <div className="start__conv__pictureprofile">
                  <img
                    src={userInfos.pictureprofile}
                    draggable="false"
                  />
                </div>
                <h3>{userInfos.pseudo}</h3>
                <p>
                  Start a conversation with{" "}
                  <span>
                    @{userInfos.pseudo}#{userInfos.tag}
                  </span>
                </p>
              </div>
            )}
            {currentPrivateChat &&
              //afficher les messages par rapport à l'ordre de la date
              currentPrivateChat.map((message: any, index: number) => {
                //afficher les messages par rapport à l'ordre de la date
                let date = new Date(message.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                return (
                  <div className="message" key={index}>
                    <div className="message__left">
                      <div className="message__left__avatar">
                        <img
                          src={message.pictureprofile}
                          draggable="false"
                          alt="logo"
                        />
                      </div>
                      <div className="message__left__content">
                        <div className="message__left__content__header">
                          <p className="message__left__content__header__name">
                            {message.pseudo}
                          </p>
                          <p className="message__left__content__header__time">
                            {
                              // si la date est aujourd'hui, afficher l'heure
                              // sinon afficher la date
                              date ===
                                new Date().toLocaleDateString("fr-FR", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                                ? new Date(message.date).toLocaleTimeString(
                                  "fr-FR",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )
                                : date
                            }
                          </p>
                        </div>
                        <div className="message__left__content__body">
                          <p
                            className="message__left__content__body__text"
                            message-id={`message-${index}`}
                          >
                            {message.message}
                            <span>{message.edited === 1 && " (edited)"}</span>
                          </p>
                          <form
                            action=""
                            className="message__left__content__body__edite hidden"
                            edit-id={`edit-${index}`}
                            onSubmit={(e) =>
                              submitEditMessage((e.target as HTMLFormElement).updateMessage.value, message.id, e)
                            }
                            onChange={(e) => handleChangeInput(e)}
                          >
                            <input type="text" id="updateMessage" defaultValue={editMessage} />
                            <div className="message__left__content__body__edite__action">
                              <p>esc to cancel</p>
                              <button
                                type="button"
                                onClick={() => handleCloseEditMessage(index)}
                              >
                                Cancel
                              </button>
                              <p>|</p>
                              <p>enter to save</p>
                              <button type="submit">Save</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    {
                      //afficher que si sender === moi
                      message.sender === user.uuid && (
                        <div className="chat__action">
                          <ul>
                            {/* <li>
                              <button>e</button>
                            </li> */}
                            <li>
                              <button onClick={() => handleEditMessage(index, message.message)}>
                                <img src={editLogo} alt="edit" />
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  handlePopupAction(message.message, message.id)
                                }
                              >
                                <img src={beanLogo} alt="bean" />
                              </button>
                            </li>
                          </ul>
                        </div>
                      )
                    }
                  </div>
                );
              })}
            <div className="message-end" ref={messagesEndRef}></div>
          </div>
        </div>
        <ChatBar sendMessage={(message: string) => sendMessage(message)} userPseudo={userInfos.pseudo} />
      </>
    );
  } else {
    return (
      <>
        <div className="chat">
          <div className="message-container">
            <div className="message">
              <div className="message__left">
                <div className="message__left__avatar">
                  <img
                    src="https://digitagava.com/dashboard/img/pp/pprose2.png"
                    alt="logo"
                  />
                </div>
                <div className="message__left__content">
                  <div className="message__left__content__header">
                    <p className="message__left__content__header__name">Bot</p>
                    <p className="message__left__content__header__time">
                      Today
                    </p>
                  </div>
                  <div className="message__left__content__body">
                    <p className="message__left__content__body__text">
                      Welcome to the server
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="message-end" ref={messagesEndRef}></div>
          </div>
        </div>
        <ChatBar />
      </>
    );
  }
};
