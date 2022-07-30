import { AgoraVideoPlayer } from "agora-rtc-react";
import React, { useEffect, useContext } from "react";
import { AgoraRtcContext } from "./Agora/Rtc/AgoraRtcContext";
import ControlsChannel from "./ControlsChannel";
import ControlsTracks from "./ControlsTracks";

const VideoCall = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { useClient, useMicrophoneAndCameraTracks } = useContext(AgoraRtcContext);

  const { setInCall } = props;
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    console.log('this is triggered now')
    let init = async () => {
      if (ready && tracks) await client.publish([tracks[0], tracks[1]]);
    };

    if (ready && tracks) {
      console.log("init ready");
      init();
    }
  }, [client, ready, tracks]);

  return (
    <>
      {ready && tracks && (
        <>
          <h2>My controls</h2>
          <ControlsChannel setInCall={setInCall} tracks={tracks} />
          <ControlsTracks tracks={tracks} />
          <h2>My video</h2>
          <div style={{ width: "500px", height: "500px" }}>
            <AgoraVideoPlayer
              style={{ height: "100%", width: "100%" }}
              videoTrack={tracks[1]}
            />
          </div>
        </>
      )}
    </>
  );
};

export default VideoCall;
