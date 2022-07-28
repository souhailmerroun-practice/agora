import { useState } from "react";
import AudienceVideo from "./components/AudienceVideo";
import ChannelForm from "./components/ChannelForm";
import VideoCall from "./components/VideoCall";

const App = () => {
  const [inCall, setInCall] = useState(false);
  //const [channelName, setChannelName] = useState("");
  const [role, setRole] = useState("");
  console.log({ role });
  return (
    <div>
      <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
      {inCall && role === "host" && (
        <VideoCall setInCall={setInCall} />
      )}

      {inCall && role === "audience" && (
        <AudienceVideo setInCall={setInCall} />
      )}

      {!inCall && (
        <ChannelForm
          setInCall={setInCall}
          setRole={setRole}
        />
      )}
    </div>
  );
};

export default App;
