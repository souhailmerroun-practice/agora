import React, { useContext, useEffect, useState } from "react";
import {
  IAgoraRTCRemoteUser,
} from "agora-rtc-react";
import VideoCall from "./VideoCall";
import ChannelForm from "./ChannelForm";
import VideoCallAudience from "./VideoCallAudience";
import Videos from "./Videos";
import { AgoraRtcContext, appId, token } from "./Agora/Rtc/AgoraRtcContext";

const App = () => {
  const { useClient } = useContext(AgoraRtcContext);

  const client = useClient();

  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  useEffect(() => {
    console.log("this is executed");
    let init = async () => {
      client.on("user-published", async (user, mediaType) => {
        console.log({ user });
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });
    };

    init();
  }, [client]);

  const handleClickJoinHost = async (e) => {
    e.preventDefault();
    setInCall(true);
    setRole("host");
    client.setClientRole("host");
    await client.join(appId, channelName, token, null);
  };

  const handleClickJoinAudience = async (e) => {
    e.preventDefault();
    setInCall(true);
    setRole("audience");
    client.setClientRole("audience");
    await client.join(appId, channelName, token, null);
  };

  return (
    <>
      <h1>Agora RTC NG SDK React Wrapper</h1>
      {inCall && role === "host" && <VideoCall setInCall={setInCall} />}

      {inCall && role === "audience" && (
        <VideoCallAudience setInCall={setInCall} />
      )}

      {inCall && <Videos users={users} />}

      {!inCall && (
        <ChannelForm
          setChannelName={setChannelName}
          handleClickJoinHost={handleClickJoinHost}
          handleClickJoinAudience={handleClickJoinAudience}
        />
      )}
    </>
  );
};

export default App;
