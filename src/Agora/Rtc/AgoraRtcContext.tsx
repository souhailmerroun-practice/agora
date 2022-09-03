import {
  ClientConfig,
  createClient,
  createMicrophoneAndCameraTracks,
  createScreenVideoTrack,
  ScreenVideoTrackInitConfig
} from "agora-rtc-react";
import React from "react";
import { AgoraRtcClass } from "./AgoraRtcClass";

export const createClientConfig: ClientConfig = {
  mode: "live",
  codec: "vp8",
};

export const createScreenVideoTrackConfig: ScreenVideoTrackInitConfig = {}

export const appId: string = "c7f382d8d1264ab997f69189dac8eb91";
export const token: string | null = null;

export const useClient = createClient(createClientConfig);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const useCreateScreenVideoTrack = createScreenVideoTrack(createScreenVideoTrackConfig);

const client = useClient();

export const agoraRtcClassInstance = new AgoraRtcClass(appId, token, client, useMicrophoneAndCameraTracks, useCreateScreenVideoTrack);

type AgoraRtcContextInterface = {
  /*appId: string;
  token: string | null;
  useClient: () => IAgoraRTCClient;
  useMicrophoneAndCameraTracks: () => {
    ready: boolean;
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
    error: AgoraRTCError | null;
  };*/
  agoraRtcClassInstance: AgoraRtcClass
};

export const AgoraRtcContext = React.createContext<AgoraRtcContextInterface>({
  /*appId: appId,
  token: token,
  useClient: useClient,
  useMicrophoneAndCameraTracks: useMicrophoneAndCameraTracks,*/
  agoraRtcClassInstance: agoraRtcClassInstance
});
