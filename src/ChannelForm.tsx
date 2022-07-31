import React from "react";

const ChannelForm = (props: {
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
  handleClickJoinAudience: any
  handleClickJoinHost: any
}) => {
  const { setChannelName, handleClickJoinAudience, handleClickJoinHost } = props;

  return (
    <form className="join">
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
