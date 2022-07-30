import { IMicrophoneAudioTrack, ICameraVideoTrack } from "agora-rtc-sdk-ng";
import { useContext, useState } from "react";
import { AgoraContext } from "../App";

export const ChannelControls = (props: {
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { useClient, useMicrophoneAndCameraTracks, appId, token } =
    useContext(AgoraContext);

  // using the hook to get access to the client object
  const client = useClient();

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
