import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AgoraRtcContext, appId, token, useClient, useMicrophoneAndCameraTracks } from "./Agora/Rtc/AgoraRtcContext";

ReactDOM.render(
  <AgoraRtcContext.Provider
    value={{
      appId: appId,
      token: token,
      useClient: useClient,
      useMicrophoneAndCameraTracks: useMicrophoneAndCameraTracks,
    }}
  >
    <App />
  </AgoraRtcContext.Provider>,
  document.getElementById("root")
);
