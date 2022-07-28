import React, { useContext, useEffect, useState } from "react";
import {
  AgoraRTCError,
  createClient,
  createMicrophoneAndCameraTracks,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
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
  users: IAgoraRTCRemoteUser[];
};

// @ts-ignore
export const AgoraClientContext = React.createContext<AgoraClientContextType>(
  {}
);

/**
 * Provider
 */

export const AgoraClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /**
   * Get config
   */
  const { config } = useContext(AgoraConfigContext);

  /**
   * Create client
   */
  const useClient = createClient(config);
  const client = useClient();

  /**
   * Remote users events
   */

  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  useEffect(() => {
    // function to initialise the SDK
    console.log("hi there");
    let init = async (name: string) => {
      console.log("hi there 2");
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });
    };

    console.log({client})

    //if (ready && tracks) {
    //console.log("init ready");
    init("test");
    //}
  }, []);

  /**
   * Tracks
   */
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

  return (
    <AgoraClientContext.Provider
      value={{ client, useMicrophoneAndCameraTracks, users }}
    >
      {children}
    </AgoraClientContext.Provider>
  );
};
