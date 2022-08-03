import {
  createClient,
  createChannel,
} from "agora-rtm-react";
import React from "react";
import { AgoraRtmClass } from "./AgoraRtmClass";

export const useClient = createClient("c7f382d8d1264ab997f69189dac8eb91");
export const useChannel = createChannel("test");

const client = useClient();
const channel = useChannel(client);

export const agoraRtmClassInstance = new AgoraRtmClass(client, channel);

type AgoraRtmContextInterface = {
  agoraRtmClassInstance: AgoraRtmClass
};

export const AgoraRtmContext = React.createContext<AgoraRtmContextInterface>({
  agoraRtmClassInstance: agoraRtmClassInstance
});
