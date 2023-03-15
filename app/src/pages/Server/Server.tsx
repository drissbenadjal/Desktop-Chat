import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Server.scss";

import { HeaderBar } from "../../components/HeaderBar/HeaderBar";
import { UsersList } from "@/components/UsersList/UsersList";
import { Chat } from "@/components/Chat/Chat";

export const Server = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id === undefined) {
      navigate("/home");
    }
    console.log(id);
  }, [id]);
  return (
    <div className="server">
    <HeaderBar type="server" />
      <div className="server__content">
        <div className="server__content__left">
            <Chat />
        </div>
        <div className="server__content__right">
            <UsersList />
        </div>
      </div>
    </div>
  );
};
