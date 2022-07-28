import { IMicrophoneAudioTrack, ICameraVideoTrack } from "agora-rtc-sdk-ng";
import { useContext, useState } from "react";
import { AgoraClientContext } from "./AgoraClientProvider";
import { AgoraConfigContext } from "./AgoraConfigProvider";

export const ChannelControls = (props: {
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { client } = useContext(AgoraClientContext);

  const { setStart, setInCall } = props;

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    // we close the tracks to perform cleanup
    setStart(false);
    setInCall(false);
  };

  return <button onClick={() => leaveChannel()}>Leave</button>;
};

export default ChannelControls;
