import React from "react";
import ControlsChannel from "./ControlsChannel";

const VideoCallAudience = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setInCall } = props;

  return (
    <>
      <h2>My controls</h2>
      <ControlsChannel setInCall={setInCall} />
    </>
  );
};

export default VideoCallAudience;
