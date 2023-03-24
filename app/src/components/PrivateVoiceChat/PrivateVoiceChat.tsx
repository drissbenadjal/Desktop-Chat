import "./PrivateVoiceChat.scss";
import LogoCall from "../../assets/icons/call.svg";
import LogoClose from "../../assets/icons/call-remove.svg";
import LogoMic from "../../assets/icons/mic.svg";
import LogoMicOff from "../../assets/icons/mic-slash.svg";
import LogoVideo from "../../assets/icons/video.svg";

export const PrivateVoiceChat = () => {
  return (
    <div className="private-voice-chat">
      <ul className="private-voice-chat-users">
        <li>
          <button className="private-voice-user">
            <img
              src="https://digitagava.com/dashboard/img/pp/pprose2.png"
              alt="User"
              draggable="false"
            />
          </button>
        </li>
        <li>
          <button className="private-voice-user">
            <img
              style={{ outline: "2px solid #1fe640d7" }}
              src="https://digitagava.com/dashboard/img/pp/default.png"
              alt="User"
              draggable="false"
            />
          </button>
        </li>
      </ul>
      <ul className="private-voice-chat-actions">
        <li>
          <button>
            <img src={LogoVideo} alt="Video" draggable="false" />
          </button>
        </li>
        <li>
          <button>
            <img src={LogoMic} alt="Mic" draggable="false" />
          </button>
        </li>
        <li>
          <button className="private-voice-chat-call-reject">
            <img src={LogoClose} alt="Close" draggable="false" />
          </button>
        </li>
      </ul>
    </div>
  );
};
