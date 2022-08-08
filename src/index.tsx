import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  agoraRtmClassInstance,
  AgoraRtmContext,
} from "./Agora/Rtm/AgoraRtmContext";
import {
  agoraRtcClassInstance,
  AgoraRtcContext,
} from "./Agora/Rtc/AgoraRtcContext";

ReactDOM.render(
  <AgoraRtmContext.Provider
    value={{
      agoraRtmClassInstance: agoraRtmClassInstance,
    }}
  >
    <AgoraRtcContext.Provider
      value={{
        agoraRtcClassInstance: agoraRtcClassInstance,
      }}
    >
      <App channelName="test" clientRole="host" />
    </AgoraRtcContext.Provider>
  </AgoraRtmContext.Provider>,
  document.getElementById("root")
);
