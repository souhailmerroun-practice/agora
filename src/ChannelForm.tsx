import React, { useContext } from "react";
import { AgoraContext } from "./App";

const ChannelForm = (props: {
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
  handleClickJoinAudience: any
  handleClickJoinHost: any
}) => {
  const { appId } = useContext(AgoraContext);

  const { setChannelName, handleClickJoinAudience, handleClickJoinHost } = props;

  return (
    <form className="join">
      {appId === "" && (
        <p style={{ color: "red" }}>
          Please enter your Agora App ID in App.tsx and refresh the page
        </p>
      )}
      <input
        type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button
        onClick={handleClickJoinHost}
      >
        Join
      </button>
      <button
        onClick={handleClickJoinAudience}
      >
        Join as audience
      </button>
    </form>
  );
};

export default ChannelForm;
