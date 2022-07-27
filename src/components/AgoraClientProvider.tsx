import React, { useContext } from "react";
import {
  AgoraRTCError,
  createClient,
  createMicrophoneAndCameraTracks,
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";
import { AgoraConfigContext } from "./AgoraConfigProvider";

/**
 * Context
 */

type AgoraClientContextType = {
  client: IAgoraRTCClient;
  useMicrophoneAndCameraTracks: () => {
    ready: boolean;
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
    error: AgoraRTCError | null;
  };
};

// @ts-ignore
export const AgoraClientContext = React.createContext<AgoraClientContextType>({});

/**
 * Provider
 */

export const AgoraClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { config } = useContext(AgoraConfigContext);
  
  const useClient = createClient(config);
  const client = useClient();
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

  return (
    <AgoraClientContext.Provider value={{ client, useMicrophoneAndCameraTracks }}>
      {children}
    </AgoraClientContext.Provider>
  );
};
