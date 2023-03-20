import React, { useEffect, useRef, useState, useContext } from "react";
import "./Chat.scss";
import { ChatBar } from "../ChatBar/ChatBar";
import { AuthContext } from "@/Context/AuthContext";
import { getCookie } from "@/Utils/utilsCookies";

export const Chat = ({ userFriends, serverId }: any) => {
  const { logout, user } = useContext(AuthContext);

  const [currentPrivateChat, setCurrentPrivateChat] = useState<any>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    }
    , 100);

    return () => clearInterval(interval);
  }, [userFriends]);

  useEffect(() => {
    if (serverId === undefined) return;
    const interval = setInterval(() => {
      fetchChatServer();
    }
    , 100);

    return () => clearInterval(interval);
  }, [serverId]);

  if (userFriends !== undefined) {
    return (
      <>
        <div className="chat">
          <div className="message-container">
            {currentPrivateChat &&
              currentPrivateChat.map((message: any, index: number) => {
                //mettre la date en / / /
                let date = new Date(message.date).toLocaleDateString( "fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                return (
                  <div className="message" key={index}>
                    <div className="message__left">
                      <div className="message__left__avatar">
                        <img
                          src={message.pictureprofile}
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
                              date === new Date().toLocaleDateString( "fr-FR", {
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
                          <p className="message__left__content__body__text">
                            {message.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="message-end" ref={messagesEndRef}></div>
          </div>
        </div>
        <ChatBar />
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
