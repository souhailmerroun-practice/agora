import { IAgoraRTCRemoteUser } from "agora-rtc-react";
import React, { useState, useEffect, useContext } from "react";
import { AgoraContext } from "./App";
import ControlsChannel from "./ControlsChannel";
import Videos from "./Videos";

const VideoCallAudience = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  channelName: string;
}) => {
  const { useClient, appId, token } = useContext(AgoraContext);

  const { setInCall, channelName } = props;
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  // using the hook to get access to the client object
  const client = useClient();
  // ready is a state variable, which returns true when the local tracks are initialized, untill then tracks variable is null

  useEffect(() => {
    // function to initialise the SDK
    let init = async (name: string) => {
      client.on("user-published", async (user, mediaType) => {
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

      client.setClientRole("audience");

      await client.join(appId, name, token, null);
      setStart(true);
    };

    init(channelName);
  }, [channelName, client]);

  return (
    <>
      {start && (
        <>
          <h2>My controls</h2>
          <ControlsChannel setStart={setStart} setInCall={setInCall} />
        </>
      )}
      {start && <Videos users={users} />}
    </>
  );
};

export default VideoCallAudience;
