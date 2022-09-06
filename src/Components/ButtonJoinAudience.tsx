import { IAgoraRTCRemoteUser } from "agora-rtc-react";
import React, { useContext } from "react";
import { AgoraRtcContext } from "../Agora/Rtc/AgoraRtcContext";
import { AgoraRtmContext } from "../Agora/Rtm/AgoraRtmContext";

export const ButtonJoinAudience = (props: {
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

  const handleClickJoinAudience = async (e) => {
    e.preventDefault();
    const uid = Math.random().toString(36).substring(2, 7);
    await agoraRtmClassInstance.login(uid, setMembersCount);
    await agoraRtmClassInstance.sendMessage(uid + "AUDIENCE_JOINED");
    await agoraRtcClassInstanceMicrophoneAndCamera.joinAsAudience(
      channelNameMicrophoneAndCamera,
      setAgoraRtcMicrophoneAndCameraRemoteUsers
    );
    await agoraRtcClassInstanceScreenVideo.joinAsAudience(
      channelNameScreenVideo,
      setAgoraRtcScreenVideoRemoteUsers
    );
    setInCall(true);
  };

  return (
    <>
      <button onClick={handleClickJoinAudience}>
        Join the webinar (audience)
      </button>
    </>
  );
};

export default ButtonJoinAudience;
