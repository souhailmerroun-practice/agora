import {
  AgoraRTCError,
  ClientRole,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  ILocalAudioTrack,
  ILocalTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";

export class AgoraRtcClass {
  appId: string;
  token: string | null;
  client: IAgoraRTCClient;
  clientRole?: ClientRole;
  users?: IAgoraRTCRemoteUser[];

  constructor(
    appId: string,
    token: string | null,
    client: IAgoraRTCClient
  ) {
    this.client = client;
    this.appId = appId;
    this.token = token;
  }
  
  /**
   * events
   */

  handleUserLeft(
    user,
    setUsers: React.Dispatch<React.SetStateAction<IAgoraRTCRemoteUser[]>>
  ) {
    console.log("leaving", user);
    setUsers((prevUsers) => {
      return prevUsers.filter((User) => User.uid !== user.uid);
    });
  }

  handleUserUnpublished(
    user,
    type,
    setUsers: React.Dispatch<React.SetStateAction<IAgoraRTCRemoteUser[]>>
  ) {
    console.log("unpublished", user, type);
    if (type === "audio") {
      user.audioTrack?.stop();
    }
    if (type === "video") {
      setUsers((prevUsers) => {
        return prevUsers.filter((User) => User.uid !== user.uid);
      });
    }
  }

  async handleUserPublished(
    user,
    mediaType,
    setUsers: React.Dispatch<React.SetStateAction<IAgoraRTCRemoteUser[]>>
  ) {
    console.log({ user });
    await this.subscribe(user, mediaType);
    console.log("subscribe success");
    if (mediaType === "video") {
      setUsers((prevUsers) => {
        return [...prevUsers, user];
      });
    }
    if (mediaType === "audio") {
      user.audioTrack?.play();
    }
  }

  /**
   * methods
   */
  async joinAsHost(
    channelName: string,
    setUsers: React.Dispatch<React.SetStateAction<IAgoraRTCRemoteUser[]>>
  ) {
    this.client.setClientRole("host");
    this.clientRole = "host";
    return this.join(channelName, setUsers);
  }

  async joinAsAudience(
    channelName: string,
    setUsers: React.Dispatch<React.SetStateAction<IAgoraRTCRemoteUser[]>>
  ) {
    this.client.setClientRole("audience");
    this.clientRole = "audience";
    return this.join(channelName, setUsers);
  }

  async join(
    channelName: string,
    setUsers: React.Dispatch<React.SetStateAction<IAgoraRTCRemoteUser[]>>
  ) {
    this.client.on("user-published", (user, mediaType) =>
      this.handleUserPublished(user, mediaType, setUsers)
    );

    this.client.on("user-unpublished", (user, mediaType) =>
      this.handleUserUnpublished(user, mediaType, setUsers)
    );

    this.client.on("user-left", (user) => this.handleUserLeft(user, setUsers));

    return await this.client.join(this.appId, channelName, this.token, null);
  }

  async subscribe(user, mediaType) {
    return await this.client.subscribe(user, mediaType);
  }

  async publish(tracks: ILocalTrack | ILocalTrack[]) {
    if (Array.isArray(tracks)) {
      await this.client.publish([tracks[0], tracks[1]]);
    } else {
      await this.client.publish(tracks);
    }
  }

  async unpublish(tracks: ILocalTrack | ILocalTrack[]) {
    if (Array.isArray(tracks)) {
      await this.client.unpublish([tracks[0], tracks[1]]);
    }

    await this.client.unpublish(tracks);
  }

  async leave() {
    await this.client.leave();
    this.client.removeAllListeners();
  }
}
