import React from "react";

export const ButtonScreenVideo = (props: {
  setScreenVideoEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setScreenVideoEnabled } = props;

  const handleClickShareScreen = () => {
    setScreenVideoEnabled(true);
  };

  return <button onClick={handleClickShareScreen}>Share screen</button>;
};

export default ButtonScreenVideo;
