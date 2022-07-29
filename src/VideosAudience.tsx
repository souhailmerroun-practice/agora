import {
  IAgoraRTCRemoteUser,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  AgoraVideoPlayer,
} from "agora-rtc-react";
import React from "react";

const VideosAudience = (props: {
  users: IAgoraRTCRemoteUser[];
}) => {  
  const { users } = props;

  return (
    <div>
      <div id="videos">
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  style={{ height: "95%", width: "95%" }}
                  className="vid"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            } else return null;
          })}
      </div>
    </div>
  );
};

export default VideosAudience;
