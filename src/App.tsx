import React, { useContext, useEffect } from "react";
import { AgoraRtmClass } from "./Agora/Rtm/AgoraRtmClass";
import { AgoraRtmContext } from "./Agora/Rtm/AgoraRtmContext";

const App = () => {
  const { useClient, useChannel } = useContext(AgoraRtmContext);

  const client = useClient();
  const channel = useChannel(client);

  useEffect(() => {
    let init = async () => {
      const agoraRtm = new AgoraRtmClass(client, channel);
      await agoraRtm.login(Math.random().toString(36).substring(2,7));
      await agoraRtm.sendMessage("hi");
      //await agoraRtm.logout();
    };

    init();
  }, []);

  return <p>Demo</p>;
};

export default App;
