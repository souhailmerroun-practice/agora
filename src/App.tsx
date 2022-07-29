import React, { useEffect, useState } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
  ClientConfig,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";
import VideoCall from "./VideoCall";
import ChannelForm from "./ChannelForm";

const config: ClientConfig = {
  mode: "rtc",
  codec: "vp8",
};

const appId: string = "c7f382d8d1264ab997f69189dac8eb91"; //ENTER APP ID HERE
const token: string | null = null;

// the create methods in the wrapper return a hook
// the create method should be called outside the parent component
// this hook can be used the get the client/stream in any component
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const App = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  return (
    <div>
      <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
      {inCall ? (
        <VideoCall
          setInCall={setInCall}
          channelName={channelName}
          useClient={useClient}
          useMicrophoneAndCameraTracks={useMicrophoneAndCameraTracks}
          appId={appId}
          token={token}
        />
      ) : (
        <ChannelForm
          setInCall={setInCall}
          setChannelName={setChannelName}
          appId={appId}
        />
      )}
    </div>
  );
};

export default App;
