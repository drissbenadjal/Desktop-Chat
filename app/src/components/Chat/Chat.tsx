import React, { useEffect, useRef, useState, useContext } from "react";
import "./Chat.scss";
import { ChatBar } from "../ChatBar/ChatBar";
import { AuthContext } from "@/Context/AuthContext";
import { getCookie } from "@/Utils/utilsCookies";

export const Chat = ({ userFriends, serverId }: any) => {
  const { logout, user } = useContext(AuthContext);

  const [currentPrivateChat, setCurrentPrivateChat] = useState<any>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // console.log(userFriends, serverId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchPrivateChat = () => {
    console.log("fetch " + userFriends);
  // fetch(`http://localhost:3001/api/private`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  //   body: new URLSearchParams({
  //     token: getCookie("token") as string,
  //     uuid: user.uuid as string,
  //     uuid2: userFriends as string,
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if (data.message === "Token invalide") {
  //       logout();
  //     } else if (data.message === "Aucun message") {
  //       setCurrentPrivateChat([]);
  //     } else {
  //       setCurrentPrivateChat(data);
  //     }
  //     console.log(data);
  //   });
  //   console.log(userFriends);
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
                return (
                  <div className="message" key={index}>
                    <div className="message__left">
                      <div className="message__left__avatar">
                        <img
                          src={message.messages[index].pictureprofile}
                          alt="logo"
                        />
                      </div>
                      <div className="message__left__content">
                        <div className="message__left__content__header">
                          <p className="message__left__content__header__name">
                            {message.messages[index].pseudo}
                          </p>
                          <p className="message__left__content__header__time">
                            {message.messages[index].date}
                          </p>
                        </div>
                        <div className="message__left__content__body">
                          <p className="message__left__content__body__text">
                            {message.messages[index].message}
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
