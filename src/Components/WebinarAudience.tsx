import React from "react";

type Props = {
  handleClickJoinAudience: () => void
}


const WebinarAudience = ({handleClickJoinAudience}: Props) => {
  return <button onClick={handleClickJoinAudience}>Join</button>;
};

export default WebinarAudience;
