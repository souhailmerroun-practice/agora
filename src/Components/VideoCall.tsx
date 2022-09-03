import { AgoraVideoPlayer } from "agora-rtc-react";
import React, { useEffect, useContext } from "react";
import { AgoraRtcContext } from "../Agora/Rtc/AgoraRtcContext";
import ControlsChannel from "./ControlsChannel";
import ControlsMicrophoneAndCameraTracks from "./ControlsMicrophoneAndCameraTracks";
import ControlsScreenVideoTracks from "./ControlsScreenVideoTracks";

const VideoCall = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { agoraRtcClassInstance } = useContext(AgoraRtcContext);

  const { setInCall } = props;
  const { ready, tracks } =
    agoraRtcClassInstance.useMicrophoneAndCameraTracks();
  const { ready: screenVideoReady, tracks: screenVideoTracks } =
    agoraRtcClassInstance.useCreateScreenVideoTrack();

  useEffect(() => {
    console.log("this is triggered now");
    let init = async () => {
      if (ready && tracks)
        await agoraRtcClassInstance.publish([tracks[0], tracks[1]]);
    };

    if (ready && tracks) {
      console.log("init ready");
      init();
    }
  }, [agoraRtcClassInstance.client, ready, tracks]);

  const publishScreenVideoTrack = async () => {
    if (screenVideoReady && screenVideoTracks)
      await agoraRtcClassInstance.publish(screenVideoTracks);
  }

  return (
    <>
      {ready && tracks && (
        <>
          <h2>My controls</h2>
          <ControlsChannel setInCall={setInCall} tracks={tracks} />
          <ControlsMicrophoneAndCameraTracks tracks={tracks} />
          <ControlsScreenVideoTracks publishScreenVideoTrack={publishScreenVideoTrack} tracks={screenVideoTracks} />
          <h2>My video</h2>
          <div style={{ width: "500px", height: "500px" }}>
            <AgoraVideoPlayer
              style={{ height: "100%", width: "100%" }}
              videoTrack={tracks[1]}
            />
          </div>
        </>
      )}

      {screenVideoReady && screenVideoTracks && (
        <>
          <h2>My screen share</h2>
          <div style={{ width: "500px", height: "500px" }}>
            <AgoraVideoPlayer
              style={{ height: "100%", width: "100%" }}
              videoTrack={screenVideoTracks}
            />
          </div>
        </>
      )}
    </>
  );
};

export default VideoCall;
