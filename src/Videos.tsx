import { IAgoraRTCRemoteUser, AgoraVideoPlayer } from "agora-rtc-react";
import React from "react";

const Videos = (props: { users: IAgoraRTCRemoteUser[] }) => {
  const { users } = props;

  return (
    <>
      <h2>Remote participants</h2>
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <div
                style={{
                  width: "150px",
                  height: "150px"
                }}
              >
                <AgoraVideoPlayer
                  style={{ height: "100%", width: "100%" }}
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              </div>
            );
          } else return null;
        })}
    </>
  );
};

export default Videos;
