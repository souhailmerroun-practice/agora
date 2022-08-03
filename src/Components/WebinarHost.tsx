import React from "react";

type Props = {
    handleClickJoinHost: () => void
}

const WebinarHost = ({handleClickJoinHost}: Props) => {
  return (
      <button onClick={handleClickJoinHost}>Join</button>
  );
};

export default WebinarHost;
