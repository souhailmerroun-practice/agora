import React, { useContext, useEffect } from "react";
import { AgoraRtmClass } from "./Agora/Rtm/AgoraRtmClass";
import { AgoraRtmContext } from "./Agora/Rtm/AgoraRtmContext";

const App = () => {
  const { useClient, useChannel } = useContext(AgoraRtmContext);

  const client = useClient();
  const channel = useChannel(client);

  const handleConnectionStateChanged = async (state: any, reason: any) => {
    console.log("ConnectionStateChanged", state, reason);
  }

  const handleChannelMessage = (msg: any, uid: any) => {
    console.log({ msg, uid });
  }

  const handleMemberJoined = (memberId: any) => {
    console.log("New Member: ", memberId);
  }

  useEffect(() => {
    let init = async () => {
      const randomId = Math.random().toString(36).substring(2,7);

      const agoraRtm = new AgoraRtmClass(client, channel, {
        handleConnectionStateChanged,
        handleChannelMessage,
        handleMemberJoined
      });

      await agoraRtm.login(randomId);
      
      await agoraRtm.sendMessage("hi");
      //await agoraRtm.logout();
    };

    init();
  }, []);

  return <p>Demo</p>;
};

export default App;
