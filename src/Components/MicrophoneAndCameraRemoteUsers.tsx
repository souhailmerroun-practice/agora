import { IAgoraRTCRemoteUser, AgoraVideoPlayer } from "agora-rtc-react";
import React from "react";

const MicrophoneAndCameraRemoteUsers = (props: { users: IAgoraRTCRemoteUser[] }) => {
  const { users } = props;

  return (
    <>
      <h2>MicrophoneAndCameraRemoteUsers {users.length} </h2>
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <div
                key={user.uid}
                style={{
                  width: "150px",
                  height: "150px",
                }}
              >
                <AgoraVideoPlayer
                  style={{ height: "100%", width: "100%" }}
                  videoTrack={user.videoTrack}
                />
              </div>
            );
          } else return null;
        })}
    </>
  );
};

export default MicrophoneAndCameraRemoteUsers;
