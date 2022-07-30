import {
  ClientConfig,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import React from "react";
import { useState } from "react";
import ChannelForm from "./components/ChannelForm";
import VideoCall from "./components/VideoCall";

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

export const AgoraContext = React.createContext({
  appId: appId,
  token: token,
  useClient: useClient,
  useMicrophoneAndCameraTracks: useMicrophoneAndCameraTracks,
});

const App = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [role, setRole] = useState("");
  console.log({ role });
  return (
    <AgoraContext.Provider
      value={{
        appId: appId,
        token: token,
        useClient: useClient,
        useMicrophoneAndCameraTracks: useMicrophoneAndCameraTracks,
      }}
    >
      <div>
        <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
        {inCall && <VideoCall setInCall={setInCall} channelName={channelName} />}

        {/*inCall && role === "audience" && (
          <AudienceVideo setInCall={setInCall} />
        )*/}

        {!inCall && <ChannelForm setInCall={setInCall} setRole={setRole} setChannelName={setChannelName} />}
      </div>
    </AgoraContext.Provider>
  );
};

export default App;
