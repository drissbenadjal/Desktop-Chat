import "./ChatBar.scss";

import BtnPlusLogo from "../../assets/icons/plus.svg";

export const ChatBar = () => {
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
        <form action="">
          <input type="text" placeholder="Envoyer un message à Username" />
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
