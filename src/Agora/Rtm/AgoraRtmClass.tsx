import { RtmChannel, RtmClient } from "agora-rtm-react";

export class AgoraRtmClass {
  client: RtmClient;
  channel: RtmChannel;

  constructor(client: RtmClient, channel: RtmChannel) {
    this.client = client;
    this.channel = channel;
  }

  async login(uid: string) {
    await this.client.login({ uid });

    await this.channel.join();

    this.client.on("ConnectionStateChanged", async (state, reason) => {
      console.log("ConnectionStateChanged", state, reason);
    });

    this.channel.on("ChannelMessage", (msg, uid) => {
      console.log({ msg, uid });
    });

    this.channel.on("MemberJoined", (memberId) => {
      console.log("New Member: ", memberId);
    });
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
