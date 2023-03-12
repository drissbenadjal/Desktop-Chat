import React, { useEffect, useRef } from "react";
import "./Chat.scss";
import { ChatBar } from "../ChatBar/ChatBar";

export const Chat = () => {

    return (
        <>
        <div className="chat">
            <div className="message-container">
                <div className="message">
                    <div className="message__left">
                        <div className="message__left__avatar">
                            <img src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png" alt="logo" />
                        </div>
                        <div className="message__left__content">
                            <div className="message__left__content__header">
                                <p className="message__left__content__header__name">Username</p>
                                <p className="message__left__content__header__time">Today at 12:00</p>
                            </div>
                            <div className="message__left__content__body">
                                <p className="message__left__content__body__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message__left">
                        <div className="message__left__avatar">
                            <img src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png" alt="logo" />
                        </div>
                        <div className="message__left__content">
                            <div className="message__left__content__header">
                                <p className="message__left__content__header__name">Username</p>
                                <p className="message__left__content__header__time">Today at 12:00</p>
                            </div>
                            <div className="message__left__content__body">
                                <p className="message__left__content__body__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message__left">
                        <div className="message__left__avatar">
                            <img src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png" alt="logo" />
                        </div>
                        <div className="message__left__content">
                            <div className="message__left__content__header">
                                <p className="message__left__content__header__name">Username</p>
                                <p className="message__left__content__header__time">Today at 12:00</p>
                            </div>
                            <div className="message__left__content__body">
                                <p className="message__left__content__body__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message__left">
                        <div className="message__left__avatar">
                            <img src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png" alt="logo" />
                        </div>
                        <div className="message__left__content">
                            <div className="message__left__content__header">
                                <p className="message__left__content__header__name">Username</p>
                                <p className="message__left__content__header__time">Today at 12:00</p>
                            </div>
                            <div className="message__left__content__body">
                                <p className="message__left__content__body__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message__left">
                        <div className="message__left__avatar">
                            <img src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png" alt="logo" />
                        </div>
                        <div className="message__left__content">
                            <div className="message__left__content__header">
                                <p className="message__left__content__header__name">Username</p>
                                <p className="message__left__content__header__time">Today at 12:00</p>
                            </div>
                            <div className="message__left__content__body">
                                <p className="message__left__content__body__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message__left">
                        <div className="message__left__avatar">
                            <img src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png" alt="logo" />
                        </div>
                        <div className="message__left__content">
                            <div className="message__left__content__header">
                                <p className="message__left__content__header__name">Username</p>
                                <p className="message__left__content__header__time">Today at 12:00</p>
                            </div>
                            <div className="message__left__content__body">
                                <p className="message__left__content__body__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message__left">
                        <div className="message__left__avatar">
                            <img src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png" alt="logo" />
                        </div>
                        <div className="message__left__content">
                            <div className="message__left__content__header">
                                <p className="message__left__content__header__name">Username</p>
                                <p className="message__left__content__header__time">Today at 12:00</p>
                            </div>
                            <div className="message__left__content__body">
                                <p className="message__left__content__body__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message__left">
                        <div className="message__left__avatar">
                            <img src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png" alt="logo" />
                        </div>
                        <div className="message__left__content">
                            <div className="message__left__content__header">
                                <p className="message__left__content__header__name">Username</p>
                                <p className="message__left__content__header__time">Today at 12:00</p>
                            </div>
                            <div className="message__left__content__body">
                                <p className="message__left__content__body__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message__left">
                        <div className="message__left__avatar">
                            <img src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png" alt="logo" />
                        </div>
                        <div className="message__left__content">
                            <div className="message__left__content__header">
                                <p className="message__left__content__header__name">Username</p>
                                <p className="message__left__content__header__time">Today at 12:00</p>
                            </div>
                            <div className="message__left__content__body">
                                <p className="message__left__content__body__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message__left">
                        <div className="message__left__avatar">
                            <img src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png" alt="logo" />
                        </div>
                        <div className="message__left__content">
                            <div className="message__left__content__header">
                                <p className="message__left__content__header__name">Username</p>
                                <p className="message__left__content__header__time">Today at 12:00</p>
                            </div>
                            <div className="message__left__content__body">
                                <p className="message__left__content__body__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message__left">
                        <div className="message__left__avatar">
                            <img src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png" alt="logo" />
                        </div>
                        <div className="message__left__content">
                            <div className="message__left__content__header">
                                <p className="message__left__content__header__name">Username</p>
                                <p className="message__left__content__header__time">Today at 12:00</p>
                            </div>
                            <div className="message__left__content__body">
                                <p className="message__left__content__body__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message__left">
                        <div className="message__left__avatar">
                            <img src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png" alt="logo" />
                        </div>
                        <div className="message__left__content">
                            <div className="message__left__content__header">
                                <p className="message__left__content__header__name">Username</p>
                                <p className="message__left__content__header__time">Today at 12:00</p>
                            </div>
                            <div className="message__left__content__body">
                                <p className="message__left__content__body__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message__left">
                        <div className="message__left__avatar">
                            <img src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png" alt="logo" />
                        </div>
                        <div className="message__left__content">
                            <div className="message__left__content__header">
                                <p className="message__left__content__header__name">Username</p>
                                <p className="message__left__content__header__time">Today at 12:00</p>
                            </div>
                            <div className="message__left__content__body">
                                <p className="message__left__content__body__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message__left">
                        <div className="message__left__avatar">
                            <img src="https://media.valorant-api.com/playercards/aeb4ce01-4781-9330-43cb-b991d1122c99/smallart.png" alt="logo" />
                        </div>
                        <div className="message__left__content">
                            <div className="message__left__content__header">
                                <p className="message__left__content__header__name">Username</p>
                                <p className="message__left__content__header__time">Today at 12:00</p>
                            </div>
                            <div className="message__left__content__body">
                                <p className="message__left__content__body__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
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