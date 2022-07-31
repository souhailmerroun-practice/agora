import {
  AgoraRTCError,
  ClientRole,
  IAgoraRTCClient,
  ICameraVideoTrack,
  ILocalTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";
import { RtmChannel, RtmClient } from "agora-rtm-react";

type Events = {};

export class AgoraRtmClass {
  appId: string;
  token: string | null;
  client: IAgoraRTCClient;
  useMicrophoneAndCameraTracks: () => {
    ready: boolean;
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
    error: AgoraRTCError | null;
  };
  clientRole?: ClientRole;

  constructor(
    appId: string,
    token: string | null,
    client: IAgoraRTCClient,
    useMicrophoneAndCameraTracks: () => {
      ready: boolean;
      tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
      error: AgoraRTCError | null;
    }
  ) {
    this.client = client;
    this.appId = appId;
    this.token = token;
    this.useMicrophoneAndCameraTracks = useMicrophoneAndCameraTracks;
  }

  async joinAsHost(channelName: string) {
    this.client.setClientRole("host");
    this.clientRole = "host";
    return this.join(channelName);
  }

  async joinAsAudience(channelName: string) {
    this.client.setClientRole("audience");
    this.clientRole = "audience";
    return this.join(channelName);
  }

  async join(channelName: string) {
    return await this.client.join(this.appId, channelName, this.token, null);
  }

  async subscribe(user, mediaType) {
    return await this.client.subscribe(user, mediaType);
  }

  async publish(tracks: ILocalTrack | ILocalTrack[]) {
    await this.client.publish([tracks[0], tracks[1]]);
  }

  async leave() {
    await this.client.leave();
    this.client.removeAllListeners();
  }
}
