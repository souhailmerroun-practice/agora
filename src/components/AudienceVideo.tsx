import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { useContext, useEffect, useState } from "react";
import { AgoraContext } from "../App";
import ChannelControls from "./ChannelControls";
import Controls from "./TracksControls";
import Videos from "./Videos";

const token: string | null = null;

const AudienceVideo = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { useClient, useMicrophoneAndCameraTracks, appId, token } =
    useContext(AgoraContext);

  const { setInCall } = props;
  const [start, setStart] = useState<boolean>(false);

  // using the hook to get access to the client object
  const client = useClient();

  useEffect(() => {
    // function to initialise the SDK
    let init = async (name: string) => {
      client.setClientRole("audience");

      await client.join(appId, name, token, null);
      setStart(true);
    };

    init("test");
    //}
  }, []);

  return (
    <div className="App">
      {start && <ChannelControls setStart={setStart} setInCall={setInCall} />}

      {/*users.length === 0 && <p>No user have joined yet</p>¨*/}

      {/*<table>
        <tr>
          <th>uid</th>
          <th>hasVideo</th>
          <th>hasAudio</th>
        </tr>
  </table>*/}
      {/*users.map((user: IAgoraRTCRemoteUser) => (
        <tr>
          <td>{user.uid}</td>
          <td>{user.hasVideo ? "yes" : "no"}</td>
          <td>{user.hasAudio ? "yes" : "no"}</td>
        </tr>
      ))*/}
    </div>
  );
};

export default AudienceVideo;
