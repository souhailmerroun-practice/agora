import {
  ClientConfig,
  createClient
} from "agora-rtc-react";
import React from "react";
import { AgoraRtcClass } from "./AgoraRtcClass";

// settings
export const appId: string = "c7f382d8d1264ab997f69189dac8eb91";
export const token: string | null = null;
export const createClientConfig: ClientConfig = {
  mode: "live",
  codec: "vp8",
};

// clients
export const useClientMicrophoneAndCamera = createClient(createClientConfig);
export const useClientScreenVideo = createClient(createClientConfig);

// tracks

// settings 2 clients
const clientMicrophoneAndCamera = useClientMicrophoneAndCamera();
const clientScreenVideo = useClientScreenVideo();

export const agoraRtcClassInstanceMicrophoneAndCamera = new AgoraRtcClass(appId, token, clientMicrophoneAndCamera);

export const agoraRtcClassInstanceScreenVideo = new AgoraRtcClass(appId, token, clientScreenVideo);

// setup
type AgoraRtcContextInterface = {
  agoraRtcClassInstanceMicrophoneAndCamera: AgoraRtcClass,
  agoraRtcClassInstanceScreenVideo: AgoraRtcClass
};

export const AgoraRtcContext = React.createContext<AgoraRtcContextInterface>({
  agoraRtcClassInstanceMicrophoneAndCamera: agoraRtcClassInstanceMicrophoneAndCamera,
  agoraRtcClassInstanceScreenVideo: agoraRtcClassInstanceScreenVideo
});
