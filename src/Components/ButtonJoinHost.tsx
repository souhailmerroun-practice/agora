import { IAgoraRTCRemoteUser } from "agora-rtc-react";
import React, { useContext } from "react";
import { AgoraRtcContext } from "../Agora/Rtc/AgoraRtcContext";
import { AgoraRtmContext } from "../Agora/Rtm/AgoraRtmContext";

export const ButtonJoinHost = (props: {
  channelNameMicrophoneAndCamera: string;
  channelNameScreenVideo: string;
  setMembersCount: React.Dispatch<React.SetStateAction<number>>;
  setAgoraRtcMicrophoneAndCameraRemoteUsers: React.Dispatch<
    React.SetStateAction<IAgoraRTCRemoteUser[]>
  >;
  setAgoraRtcScreenVideoRemoteUsers: React.Dispatch<
    React.SetStateAction<IAgoraRTCRemoteUser[]>
  >;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    agoraRtcClassInstanceMicrophoneAndCamera,
    agoraRtcClassInstanceScreenVideo,
  } = useContext(AgoraRtcContext);
  const { agoraRtmClassInstance } = useContext(AgoraRtmContext);

  const {
    channelNameMicrophoneAndCamera,
    channelNameScreenVideo,
    setMembersCount,
    setAgoraRtcMicrophoneAndCameraRemoteUsers,
    setAgoraRtcScreenVideoRemoteUsers,
    setInCall,
  } = props;

  const handleClickJoinHost = async (e) => {
    e.preventDefault();
    const uid = Math.random().toString(36).substring(2, 7);
    await agoraRtmClassInstance.login(uid, setMembersCount);
    await agoraRtmClassInstance.sendMessage(uid + "HOST_JOINED");
    await agoraRtcClassInstanceMicrophoneAndCamera.joinAsHost(
      channelNameMicrophoneAndCamera,
      setAgoraRtcMicrophoneAndCameraRemoteUsers
    );
    await agoraRtcClassInstanceScreenVideo.joinAsHost(
      channelNameScreenVideo,
      setAgoraRtcScreenVideoRemoteUsers
    );
    setInCall(true);
  };

  return (
    <button onClick={handleClickJoinHost}>Start the webinar (host)</button>
  );
};

export default ButtonJoinHost;
