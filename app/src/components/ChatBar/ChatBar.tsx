import "./ChatBar.scss";

import BtnPlusLogo from "../../assets/icons/plus.svg";

export const ChatBar = ({ sendMessage, userPseudo }: any) => {

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendMessage(e.target[0].value);
    e.target[0].value = "";
  };
  
  return (
    <div className="chatbar">
      <div className="container-chat">
        <ul className="chatbar__left">
          <li>
            <button className="btn-plus">
              <img src={BtnPlusLogo} alt="" />
            </button>
          </li>
        </ul>
        <form action="" onSubmit={handleSubmit}>
          <input type="text" placeholder={`Envoyer un message à @${userPseudo}`} />
        </form>
        <ul className="chatbar__right">
          <li>
            <button>
              <img src={BtnPlusLogo} alt="" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
