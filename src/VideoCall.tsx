import { AgoraVideoPlayer, IAgoraRTCRemoteUser } from "agora-rtc-react";
import React, { useState, useEffect, useContext } from "react";
import { AgoraContext } from "./App";
import ControlsChannel from "./ControlsChannel";
import ControlsTracks from "./ControlsTracks";
import Videos from "./Videos";

const VideoCall = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  channelName: string;
}) => {
  const { useClient, useMicrophoneAndCameraTracks, appId, token } =
    useContext(AgoraContext);

  const { setInCall, channelName } = props;
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  // using the hook to get access to the client object
  const client = useClient();
  // ready is a state variable, which returns true when the local tracks are initialized, untill then tracks variable is null
  const { ready, tracks } = useMicrophoneAndCameraTracks();

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

      client.setClientRole("host");
      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  return (
    <>
      {ready && tracks && (
        <>
          <h2>My controls</h2>
          <ControlsChannel setStart={setStart} setInCall={setInCall} />
          <ControlsTracks tracks={tracks} />
          <h2>My video</h2>
          <div
            style={{ width: "500px", height: "500px" }}
          >
            <AgoraVideoPlayer
              style={{ height: "100%", width: "100%" }}
              videoTrack={tracks[1]}
            />
          </div>
        </>
      )}
      {start && tracks && <Videos users={users} />}
    </>
  );
};

export default VideoCall;
