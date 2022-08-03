import React, { useContext, useState } from "react";
import { ClientRole, IAgoraRTCRemoteUser } from "agora-rtc-react";
import { AgoraRtcContext } from "./Agora/Rtc/AgoraRtcContext";
import { AgoraRtmContext } from "./Agora/Rtm/AgoraRtmContext";
import ChannelForm from "./Components/ChannelForm";
import VideoCall from "./Components/VideoCall";
import VideoCallAudience from "./Components/VideoCallAudience";
import Videos from "./Components/Videos";

type Props = {
  channelName: string;
  clientRole: ClientRole;
};

const App = ({ channelName, clientRole }: Props) => {
  const { agoraRtcClassInstance } = useContext(AgoraRtcContext);
  const { agoraRtmClassInstance } = useContext(AgoraRtmContext);

  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [membersCount, setMembersCount] = useState<number>(0);

  const [inCall, setInCall] = useState(false);

  /**
   * User events
   */

  const handleClickJoinHost = async (e) => {
    e.preventDefault();
    await agoraRtmClassInstance.login(
      Math.random().toString(36).substring(2, 7),
      setMembersCount
    );
    await agoraRtmClassInstance.sendMessage("HOST_JOINED");
    await agoraRtcClassInstance.joinAsHost(channelName, setUsers);
    setInCall(true);
  };

  const handleClickJoinAudience = async (e) => {
    e.preventDefault();
    await agoraRtmClassInstance.login(
      Math.random().toString(36).substring(2, 7),
      setMembersCount
    );
    await agoraRtmClassInstance.sendMessage("AUDIENCE_JOINED");

    await agoraRtcClassInstance.joinAsAudience(channelName, setUsers);
    setInCall(true);
  };

  return (
    <>
      <p>In the channel {membersCount}</p>

      {inCall && agoraRtcClassInstance.clientRole === "host" && (
        <VideoCall setInCall={setInCall} />
      )}

      {inCall && agoraRtcClassInstance.clientRole === "audience" && (
        <VideoCallAudience setInCall={setInCall} />
      )}

      {inCall && <Videos users={users} />}

      {!inCall && clientRole === "host" && (
        <button onClick={handleClickJoinHost}>Start the webinar (host)</button>
      )}

      {!inCall && clientRole === "audience" && (
        <button onClick={handleClickJoinAudience}>Join the webinar (audience)</button>
      )}
    </>
  );
};

export default App;
