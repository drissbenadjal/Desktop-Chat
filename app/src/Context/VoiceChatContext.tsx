import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { getCookie, addCookie, removeCookie } from "../Utils/utilsCookies";
import { io, Socket } from "socket.io-client";
import Peer from "simple-peer";
import { AuthContext } from "@/Context/AuthContext";

const VoiceChatContext = createContext<any>({
  video: null,
  audio: null,
  otherVideo: null,
  otherAudio: null,
  receivingCall: false,
  caller: "",
  callSignal: null,
  callAccepted: false,
  callEnded: false,
  name: "",
  myVideo: null,
  userVideo: null,
  userAudio: null,
  connectionRef: null,
  handleVideo: () => {},
  handleRemoveVideo: () => {},
  handleMic: () => {},
  callUser: () => {},
  answerCall: () => {},
  leaveCall: () => {},
});

const VoiceChatContextProvider = ({ children }: any) => {
  const socket = io("http://localhost:3001");

  const { user } = useContext(AuthContext);

  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [otherVideo, setOtherVideo] = useState(null);
  const [otherAudio, setOtherAudio] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callSignal, setCallSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef<any>();
  const userVideo = useRef<any>();
  // const myAudio = useRef();
  const userAudio = useRef<any>();
  const connectionRef = useRef<any>();

  const handleVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      setVideo(stream as any);
      myVideo.current.srcObject = stream;
    });
  };

  const handleRemoveVideo = () => {
    if (video) {
      //destroy video stream
      (video as any).getTracks().forEach((track: any) => track.stop());
      setVideo(null);
      myVideo.current.srcObject = null;
    }
  };

  const handleMic = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setAudio(stream as any);
    });
  };

  const handleRemoveMic = () => {
    if (audio) {
      //destroy audio stream
      (audio as any).getTracks().forEach((track: any) => track.stop());
      setAudio(null);
    }
  };

  useEffect(() => {
    handleMic();
    socket.on("callUser", (data: any) => {
      if (data.from === user.uuid) {
        setReceivingCall(true);
        setCaller(data.from);
        setName(data.name);
        setCallSignal(data.signal);
      }
    });
  }, [user.uuid]);

  const callUser = () => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: audio as any,
    });

    peer.on("signal", (data: any) => {
      socket.emit("callUser", {
        userToCall: user.uuid,
        signalData: data,
        from: user.uuid,
        name: user.pseudo,
      });
    });

    peer.on("stream", (stream: any) => {
      userVideo.current.srcObject = stream;
    });

    peer.on("audioStream", (stream: any) => {
      userAudio.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal: any) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: audio as any,
    });

    peer.on("signal", (data: any) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream: any) => {
      userVideo.current.srcObject = stream;
    });

    peer.on("audioStream", (stream: any) => {
      userAudio.current.srcObject = stream;
    });

    peer.signal(callSignal as any);

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <VoiceChatContext.Provider
      value={{
        video,
        audio,
        otherVideo,
        otherAudio,
        receivingCall,
        caller,
        callSignal,
        callAccepted,
        callEnded,
        name,
        handleVideo,
        handleRemoveVideo,
        handleMic,
        callUser,
        answerCall,
        leaveCall,
        userVideo,
        userAudio,
        myVideo,
        connectionRef,
      }}
    >
      {children}
    </VoiceChatContext.Provider>
  );
};

export { VoiceChatContext, VoiceChatContextProvider };
