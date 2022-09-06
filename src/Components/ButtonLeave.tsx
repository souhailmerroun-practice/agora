import React, { useContext } from "react";
import { AgoraRtcContext } from "../Agora/Rtc/AgoraRtcContext";
import { AgoraRtmContext } from "../Agora/Rtm/AgoraRtmContext";

export const ButtonLeave = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { agoraRtcClassInstanceMicrophoneAndCamera, agoraRtcClassInstanceScreenVideo } = useContext(AgoraRtcContext);
  const { agoraRtmClassInstance } = useContext(AgoraRtmContext);

  const { setInCall } = props;

  const leaveChannel = async () => {
    await agoraRtcClassInstanceMicrophoneAndCamera.leave();
    await agoraRtcClassInstanceScreenVideo.leave();
    await agoraRtmClassInstance.logout();
    setInCall(false);
  };

  return <>{<button onClick={leaveChannel}>Leave</button>}</>;
};

export default ButtonLeave;
