import { RtmChannel, RtmClient } from "agora-rtm-react";

export class AgoraRtmClass {
  client: RtmClient;
  channel: RtmChannel;

  constructor(client: RtmClient, channel: RtmChannel) {
    this.client = client;
    this.channel = channel;
  }

  /**
   * events
   */
  handleConnectionStateChanged(state: any, reason: any) {
    console.log("ConnectionStateChanged", state, reason);
  }

  handleChannelMessage(msg: any, uid: any) {
    console.log({ msg, uid });
  }

  handleMemberJoined(memberId: any) {
    console.log("New Member: ", memberId);
  }

  handleMemberCountUpdated(
    memberCount: number,
    setMembersCount: React.Dispatch<React.SetStateAction<number>>
  ) {
    setMembersCount(memberCount);
  }

  /**
   * methods
   */

  async login(
    uid: string,
    setMembersCount: React.Dispatch<React.SetStateAction<number>>
  ) {
    this.client.on("ConnectionStateChanged", this.handleConnectionStateChanged);

    this.channel.on("ChannelMessage", this.handleChannelMessage);

    this.channel.on("MemberJoined", this.handleMemberJoined);

    this.channel.on("MemberCountUpdated", (memberCount) =>
      this.handleMemberCountUpdated(memberCount, setMembersCount)
    );

    await this.client.login({ uid });

    await this.channel.join();
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

  async getMembers() {
    return await this.channel.getMembers();
  }
}
