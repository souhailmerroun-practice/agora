import { IMicrophoneAudioTrack, ICameraVideoTrack } from "agora-rtc-react";
import React, { useState } from "react";

export const ControlsTracks = (props: {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}) => {
  const { tracks } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type: "audio" | "video") => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  return (
    <>
      <button className={trackState.audio ? "on" : ""} onClick={() => mute("audio")}>
        {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
      </button>
      <button className={trackState.video ? "on" : ""} onClick={() => mute("video")}>
        {trackState.video ? "MuteVideo" : "UnmuteVideo"}
      </button>
    </>
  );
};

export default ControlsTracks;
