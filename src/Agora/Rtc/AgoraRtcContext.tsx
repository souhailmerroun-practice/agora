import {
  AgoraRTCError,
  ClientConfig,
  createClient,
  createMicrophoneAndCameraTracks,
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";
import React from "react";
import { AgoraRtmClass } from "./AgoraRtcClass";

export const config: ClientConfig = {
  mode: "live",
  codec: "vp8",
};

export const appId: string = "c7f382d8d1264ab997f69189dac8eb91";
export const token: string | null = null;

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

const client = useClient();

export const agoraRtcClassInstance = new AgoraRtmClass(appId, token, client, useMicrophoneAndCameraTracks);

type AgoraRtcContextInterface = {
  /*appId: string;
  token: string | null;
  useClient: () => IAgoraRTCClient;
  useMicrophoneAndCameraTracks: () => {
    ready: boolean;
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
    error: AgoraRTCError | null;
  };*/
  agoraRtcClassInstance: AgoraRtmClass
};

export const AgoraRtcContext = React.createContext<AgoraRtcContextInterface>({
  /*appId: appId,
  token: token,
  useClient: useClient,
  useMicrophoneAndCameraTracks: useMicrophoneAndCameraTracks,*/
  agoraRtcClassInstance: agoraRtcClassInstance
});
