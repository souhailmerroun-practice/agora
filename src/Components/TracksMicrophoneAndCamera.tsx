import {
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  AgoraVideoPlayer,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import React, { useContext, useEffect, useState } from "react";
import { AgoraRtcContext } from "../Agora/Rtc/AgoraRtcContext";

const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

export const TracksMicrophoneAndCamera = (props: {}) => {
  const { agoraRtcClassInstanceMicrophoneAndCamera } =
    useContext(AgoraRtcContext);

  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const [trackState, setTrackState] = useState({ video: true, audio: true });

  useEffect(() => {
    let init = async () => {
      if (ready && tracks)
        await agoraRtcClassInstanceMicrophoneAndCamera.publish([
          tracks[0],
          tracks[1],
        ]);
    };

    if (ready && tracks) {
      console.log("init ready");
      init();
    }
  }, [agoraRtcClassInstanceMicrophoneAndCamera.client, ready, tracks]);

  const mute = async (type: "audio" | "video") => {
    if (ready && tracks) {
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
    }
  };

  if (ready && tracks) {
    return (
      <>
        <button
          className={trackState.audio ? "on" : ""}
          onClick={() => mute("audio")}
        >
          {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
        </button>
        <button
          className={trackState.video ? "on" : ""}
          onClick={() => mute("video")}
        >
          {trackState.video ? "MuteVideo" : "UnmuteVideo"}
        </button>
        <div style={{ width: "250px", height: "250px" }}>
          <AgoraVideoPlayer
            style={{ height: "100%", width: "100%" }}
            videoTrack={tracks[1]}
          />
        </div>
      </>
    );
  }

  return <p>Tracks Microphone and Camera not ready</p>;
};

export default TracksMicrophoneAndCamera;
