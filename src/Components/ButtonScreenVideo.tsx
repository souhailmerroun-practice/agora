import {
  AgoraVideoPlayer,
  ILocalAudioTrack,
  ILocalVideoTrack,
} from "agora-rtc-react";
import React, { useContext, useEffect, useState } from "react";
import {
  agoraRtcClassInstanceMicrophoneAndCamera,
  AgoraRtcContext,
} from "../Agora/Rtc/AgoraRtcContext";

export const ButtonScreenVideo = () => {
  const { agoraRtcClassInstanceScreenVideo } = useContext(AgoraRtcContext);

  const [trackState, setTrackState] = useState(false);

  const { ready, tracks } =
    agoraRtcClassInstanceScreenVideo.tracks.useScreenVideoTrack();

  useEffect(() => {
    console.log("this is triggered now");
    let init = async () => {
      if (ready && tracks)
        await agoraRtcClassInstanceScreenVideo.publish(tracks);
    };

    if (ready && tracks) {
      console.log("init ready");
      init();
    }
  }, [agoraRtcClassInstanceScreenVideo.client, ready, tracks]);


  const handleStopScreenShare = async () => {
    tracks.close();
    await agoraRtcClassInstanceScreenVideo.unpublish(tracks);
  }

  if (tracks) {
    return (
      <>
        <h2>Local track</h2>
        <button className={trackState ? "on" : ""} onClick={handleStopScreenShare}>
          Stop Screen Share
        </button>
        <div style={{ width: "250px", height: "250px" }}>
          <AgoraVideoPlayer
            style={{ height: "100%", width: "100%" }}
            videoTrack={tracks}
          />
        </div>
      </>
    );
  }

  return <p>not ready</p>;
};

export default ButtonScreenVideo;
