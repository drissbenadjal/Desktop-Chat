import "./ChatStatus.scss";

import SettingsIcon from "../../assets/icons/setting.svg";
import MicIcon from "../../assets/icons/mic.svg";
import MicOffIcon from "../../assets/icons/mic-slash.svg";
import HeadphoneIcon from "../../assets/icons/headset-mic.svg";
import HeadphoneOffIcon from "../../assets/icons/headset-mic-slash.svg";

export const ChatStatus = () => {
  return (
    <div className="chat-status">
      <div className="chat-status__container">
        <div className="chat-status__container__top"></div>
        <div className="chat-status__container__bottom">
          <div className="chat-status__container__bottom__left">
            <button>
              <div className="status-container">
                <img
                  src="https://i1.sndcdn.com/artworks-WOCEshLCo95Xb3eQ-bxJkqw-t500x500.jpg"
                  alt="logo"
                />
                <div className="status online"></div>
              </div>
              <div className="user-infos">
                <p className="username">Username</p>
                <p className="tag">#1234</p>
              </div>
            </button>
          </div>
          <div className="chat-status__container__bottom__right">
            <ul>
              <li>
                <button>
                    <img src={MicIcon} alt="" />
                </button>
              </li>
              <li>
                <button>
                    <img src={HeadphoneIcon} alt="" />
                </button>
              </li>
              <li>
                <button>
                    <img src={SettingsIcon} alt="" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
