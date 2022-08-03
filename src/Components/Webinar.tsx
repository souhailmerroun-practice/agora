import React, { useContext, useEffect, useState } from "react";
import { IAgoraRTCRemoteUser } from "agora-rtc-react";
import { AgoraRtcContext } from "../Agora/Rtc/AgoraRtcContext";
import { AgoraRtmContext } from "../Agora/Rtm/AgoraRtmContext";
import ChannelForm from "./ChannelForm";
import VideoCall from "./VideoCall";
import VideoCallAudience from "./VideoCallAudience";
import Videos from "./Videos";

const App = () => {
  const { agoraRtcClassInstance } = useContext(AgoraRtcContext);
  const { agoraRtmClassInstance } = useContext(AgoraRtmContext);

  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  const [membersCount, setMembersCount] = useState<number>();

  /**
   * AgoraRtm Events
   */
  const handleConnectionStateChanged = async (state: any, reason: any) => {
    console.log("ConnectionStateChanged", state, reason);
  };

  const handleChannelMessage = (msg: any, uid: any) => {
    console.log({ msg, uid });
  };

  const handleMemberJoined = (memberId: any) => {
    console.log("New Member: ", memberId);
  };

  const handleMemberCountUpdated = (memberCount: number) => {
    setMembersCount(memberCount);
  }

  /**
   * AgoraRtc Events
   */

  const handleUserLeft = (user) => {
    console.log("leaving", user);
    setUsers((prevUsers) => {
      return prevUsers.filter((User) => User.uid !== user.uid);
    });
  };

  const handleUserUnpublished = (user, type) => {
    console.log("unpublished", user, type);
    if (type === "audio") {
      user.audioTrack?.stop();
    }
    if (type === "video") {
      setUsers((prevUsers) => {
        return prevUsers.filter((User) => User.uid !== user.uid);
      });
    }
  };

  const handleUserPublished = async (user, mediaType) => {
    console.log({ user });
    await agoraRtcClassInstance.subscribe(user, mediaType);
    console.log("subscribe success");
    if (mediaType === "video") {
      setUsers((prevUsers) => {
        return [...prevUsers, user];
      });
    }
    if (mediaType === "audio") {
      user.audioTrack?.play();
    }
  };

  /**
   * User events
   */

  const handleClickJoinHost = async (e) => {
    e.preventDefault();
    await agoraRtmClassInstance.login(
      Math.random().toString(36).substring(2, 7),
      {
        handleConnectionStateChanged,
        handleChannelMessage,
        handleMemberJoined,
        handleMemberCountUpdated
      }
    );
    await agoraRtmClassInstance.sendMessage("HOST_JOINED");
    await agoraRtcClassInstance.joinAsHost(channelName);
    setInCall(true);
  };

  const handleClickJoinAudience = async (e) => {
    e.preventDefault();
    await agoraRtmClassInstance.login(
      Math.random().toString(36).substring(2, 7),
      {
        handleConnectionStateChanged,
        handleChannelMessage,
        handleMemberJoined,
        handleMemberCountUpdated
      }
    );
    await agoraRtmClassInstance.sendMessage("AUDIENCE_JOINED");
    
    await agoraRtcClassInstance.joinAsAudience(channelName);
    setInCall(true);
  };

  useEffect(() => {
    let init = async () => {
      agoraRtcClassInstance.client.on("user-published", handleUserPublished);

      agoraRtcClassInstance.client.on("user-unpublished", handleUserUnpublished);

      agoraRtcClassInstance.client.on("user-left", handleUserLeft);
    };

    init();
  }, [agoraRtcClassInstance.client]);

  console.log(agoraRtcClassInstance.clientRole);

  return (
    <>
      <p>In the channel: {membersCount}</p>
      <h1>Agora RTC NG SDK React Wrapper</h1>
      {inCall && agoraRtcClassInstance.clientRole === "host" && <VideoCall setInCall={setInCall} />}

      {inCall && agoraRtcClassInstance.clientRole === "audience" && (
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
