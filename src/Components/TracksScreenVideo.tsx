import {
  AgoraVideoPlayer,
  createScreenVideoTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  ScreenVideoTrackInitConfig,
} from "agora-rtc-react";
import React, { useContext, useEffect, useState } from "react";
import {
  agoraRtcClassInstanceMicrophoneAndCamera,
  AgoraRtcContext,
} from "../Agora/Rtc/AgoraRtcContext";

const createScreenVideoTrackConfig: ScreenVideoTrackInitConfig = {};
const useScreenVideoTrack = createScreenVideoTrack(
  createScreenVideoTrackConfig
);

export const TracksScreenVideo = (props: {
  setScreenVideoEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setScreenVideoEnabled } = props;

  const { agoraRtcClassInstanceScreenVideo } = useContext(AgoraRtcContext);

  const { ready, tracks } = useScreenVideoTrack();

  useEffect(() => {
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
    await agoraRtcClassInstanceScreenVideo.unpublish(tracks);
    setScreenVideoEnabled(false);
  };

  if (tracks) {
    return (
      <>
        <button onClick={handleStopScreenShare}>Stop Screen Share</button>
        <div style={{ width: "250px", height: "250px" }}>
          <AgoraVideoPlayer
            style={{ height: "100%", width: "100%" }}
            videoTrack={tracks}
          />
        </div>
      </>
    );
  }

  return <p>Tracks Screen Video not ready</p>;
};

export default TracksScreenVideo;
