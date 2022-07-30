import { IMicrophoneAudioTrack, ICameraVideoTrack } from "agora-rtc-react";
import React, { useContext } from "react";
import { AgoraRtcContext } from "./Agora/Rtc/AgoraRtcContext";

export const ControlsChannel = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  tracks?: [IMicrophoneAudioTrack, ICameraVideoTrack];
}) => {
  const { useClient } = useContext(AgoraRtcContext);

  const { setInCall, tracks } = props;
  const client = useClient();

  const leaveChannel = async () => {
    if (tracks) {
      tracks[0].close();
      tracks[1].close();
    }

    await client.leave();
    client.removeAllListeners();
    setInCall(false);
  };

  return <>{<button onClick={leaveChannel}>Leave</button>}</>;
};

export default ControlsChannel;
