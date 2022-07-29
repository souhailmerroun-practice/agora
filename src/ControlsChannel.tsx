import React, { useContext } from "react";
import { AgoraContext } from "./App";

export const ControlsChannel = (props: {
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { useClient } = useContext(AgoraContext);

  const { setStart, setInCall } = props;
  const client = useClient();

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    // we close the tracks to perform cleanup
    setStart(false);
    setInCall(false);
  };

  return <>{<p onClick={() => leaveChannel()}>Leave</p>}</>;
};

export default ControlsChannel;
