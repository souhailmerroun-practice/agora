import { ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-react";
import React, { useState } from "react";

export const ControlsScrenVideoTracks = (props: {
  tracks: ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack];
  publishScreenVideoTrack : () => void;
}) => {
  const { tracks, publishScreenVideoTrack  } = props;

  return (
    <>
      <button onClick={publishScreenVideoTrack}>
        Share Screen
      </button>
    </>
  );
};

export default ControlsScrenVideoTracks;
