import { IMicrophoneAudioTrack, ICameraVideoTrack } from "agora-rtc-react";
import React, { useContext } from "react";
import { AgoraRtcContext } from "../Agora/Rtc/AgoraRtcContext";
import { AgoraRtmContext } from "../Agora/Rtm/AgoraRtmContext";

export const ControlsChannel = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  tracks?: [IMicrophoneAudioTrack, ICameraVideoTrack];
}) => {
  const { agoraRtcClassInstance } = useContext(AgoraRtcContext);
  const { agoraRtmClassInstance } = useContext(AgoraRtmContext);

  const { setInCall, tracks } = props;

  const leaveChannel = async () => {
    if (tracks) {
      tracks[0].close();
      tracks[1].close();
    }

    await agoraRtcClassInstance.leave();
    await agoraRtmClassInstance.logout();
    setInCall(false);
  };

  return <>{<button onClick={leaveChannel}>Leave</button>}</>;
};

export default ControlsChannel;
