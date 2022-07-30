import { createClient, createChannel, RtmClient, RtmChannel } from "agora-rtm-react";
import React from "react";

export const useClient = createClient("c7f382d8d1264ab997f69189dac8eb91");
export const useChannel = createChannel("test");

type AgoraRtmContextInterface = {
  useClient: () => RtmClient;
  useChannel: (client: RtmClient) => RtmChannel;
};

export const AgoraRtmContext = React.createContext<AgoraRtmContextInterface>({
  useClient: useClient,
  useChannel: useChannel,
});
