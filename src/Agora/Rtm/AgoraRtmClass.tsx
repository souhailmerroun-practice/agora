import { RtmChannel, RtmClient } from "agora-rtm-react";

type Events = {
  handleConnectionStateChanged: (state: any, reason: any) => void
  handleChannelMessage: (msg: any, uid: any) => void
  handleMemberJoined: (memberId: any) => void
  handleMemberCountUpdated: (memberCount: number) => void
}

export class AgoraRtmClass {
  client: RtmClient;
  channel: RtmChannel;
  events?: Events;

  constructor(client: RtmClient, channel: RtmChannel) {
    this.client = client;
    this.channel = channel;
  }

  async getMembers () {
    return await this.channel.getMembers();
  }

  async login(uid: string, events: Events) {
    this.events = events;

    await this.client.login({ uid });

    await this.channel.join();

    this.client.on("ConnectionStateChanged", this.events.handleConnectionStateChanged);

    this.channel.on("ChannelMessage", this.events.handleChannelMessage);

    this.channel.on("MemberJoined", this.events.handleMemberJoined);

    this.channel.on("MemberCountUpdated", this.events.handleMemberCountUpdated);
  }

  async logout() {
    await this.channel.leave();
    await this.client.logout();
    this.channel.removeAllListeners();
    this.client.removeAllListeners();
  }

  async sendMessage(text: string) {
    let message = this.client.createMessage({ text, messageType: "TEXT" });
    await this.channel.sendMessage(message);
  }
}