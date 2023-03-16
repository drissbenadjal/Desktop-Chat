import React, { useEffect, useRef } from "react";
import "./Chat.scss";
import { ChatBar } from "../ChatBar/ChatBar";

export const Chat = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      console.log("scroll");
    }
  };

  return (
    <>
      <div className="chat">
        <div className="message-container" ref={messagesEndRef}>
          <div className="message">
            <div className="message__left">
              <div className="message__left__avatar">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
              </div>
              <div className="message__left__content">
                <div className="message__left__content__header">
                  <p className="message__left__content__header__name">
                    Username
                  </p>
                  <p className="message__left__content__header__time">
                    Today at 12:00
                  </p>
                </div>
                <div className="message__left__content__body">
                  <p className="message__left__content__body__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="message">
            <div className="message__left">
              <div className="message__left__avatar">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
              </div>
              <div className="message__left__content">
                <div className="message__left__content__header">
                  <p className="message__left__content__header__name">
                    Username
                  </p>
                  <p className="message__left__content__header__time">
                    Today at 12:00
                  </p>
                </div>
                <div className="message__left__content__body">
                  <p className="message__left__content__body__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="message">
            <div className="message__left">
              <div className="message__left__avatar">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
              </div>
              <div className="message__left__content">
                <div className="message__left__content__header">
                  <p className="message__left__content__header__name">
                    Username
                  </p>
                  <p className="message__left__content__header__time">
                    Today at 12:00
                  </p>
                </div>
                <div className="message__left__content__body">
                  <p className="message__left__content__body__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="message">
            <div className="message__left">
              <div className="message__left__avatar">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
              </div>
              <div className="message__left__content">
                <div className="message__left__content__header">
                  <p className="message__left__content__header__name">
                    Username
                  </p>
                  <p className="message__left__content__header__time">
                    Today at 12:00
                  </p>
                </div>
                <div className="message__left__content__body">
                  <p className="message__left__content__body__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="message">
            <div className="message__left">
              <div className="message__left__avatar">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
              </div>
              <div className="message__left__content">
                <div className="message__left__content__header">
                  <p className="message__left__content__header__name">
                    Username
                  </p>
                  <p className="message__left__content__header__time">
                    Today at 12:00
                  </p>
                </div>
                <div className="message__left__content__body">
                  <p className="message__left__content__body__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="message">
            <div className="message__left">
              <div className="message__left__avatar">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
              </div>
              <div className="message__left__content">
                <div className="message__left__content__header">
                  <p className="message__left__content__header__name">
                    Username
                  </p>
                  <p className="message__left__content__header__time">
                    Today at 12:00
                  </p>
                </div>
                <div className="message__left__content__body">
                  <p className="message__left__content__body__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="message">
            <div className="message__left">
              <div className="message__left__avatar">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
              </div>
              <div className="message__left__content">
                <div className="message__left__content__header">
                  <p className="message__left__content__header__name">
                    Username
                  </p>
                  <p className="message__left__content__header__time">
                    Today at 12:00
                  </p>
                </div>
                <div className="message__left__content__body">
                  <p className="message__left__content__body__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="message">
            <div className="message__left">
              <div className="message__left__avatar">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
              </div>
              <div className="message__left__content">
                <div className="message__left__content__header">
                  <p className="message__left__content__header__name">
                    Username
                  </p>
                  <p className="message__left__content__header__time">
                    Today at 12:00
                  </p>
                </div>
                <div className="message__left__content__body">
                  <p className="message__left__content__body__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="message">
            <div className="message__left">
              <div className="message__left__avatar">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
              </div>
              <div className="message__left__content">
                <div className="message__left__content__header">
                  <p className="message__left__content__header__name">
                    Username
                  </p>
                  <p className="message__left__content__header__time">
                    Today at 12:00
                  </p>
                </div>
                <div className="message__left__content__body">
                  <p className="message__left__content__body__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="message">
            <div className="message__left">
              <div className="message__left__avatar">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
              </div>
              <div className="message__left__content">
                <div className="message__left__content__header">
                  <p className="message__left__content__header__name">
                    Username
                  </p>
                  <p className="message__left__content__header__time">
                    Today at 12:00
                  </p>
                </div>
                <div className="message__left__content__body">
                  <p className="message__left__content__body__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="message">
            <div className="message__left">
              <div className="message__left__avatar">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
              </div>
              <div className="message__left__content">
                <div className="message__left__content__header">
                  <p className="message__left__content__header__name">
                    Username
                  </p>
                  <p className="message__left__content__header__time">
                    Today at 12:00
                  </p>
                </div>
                <div className="message__left__content__body">
                  <p className="message__left__content__body__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="message">
            <div className="message__left">
              <div className="message__left__avatar">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
              </div>
              <div className="message__left__content">
                <div className="message__left__content__header">
                  <p className="message__left__content__header__name">
                    Username
                  </p>
                  <p className="message__left__content__header__time">
                    Today at 12:00
                  </p>
                </div>
                <div className="message__left__content__body">
                  <p className="message__left__content__body__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="message">
            <div className="message__left">
              <div className="message__left__avatar">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
              </div>
              <div className="message__left__content">
                <div className="message__left__content__header">
                  <p className="message__left__content__header__name">
                    Username
                  </p>
                  <p className="message__left__content__header__time">
                    Today at 12:00
                  </p>
                </div>
                <div className="message__left__content__body">
                  <p className="message__left__content__body__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="message">
            <div className="message__left">
              <div className="message__left__avatar">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
              </div>
              <div className="message__left__content">
                <div className="message__left__content__header">
                  <p className="message__left__content__header__name">
                    Username
                  </p>
                  <p className="message__left__content__header__time">
                    Today at 12:00
                  </p>
                </div>
                <div className="message__left__content__body">
                  <p className="message__left__content__body__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quod.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatBar />
    </>
  );
};
