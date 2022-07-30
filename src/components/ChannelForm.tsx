import { useContext } from "react";
import { AgoraContext } from "../App";

const ChannelForm = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { useClient, useMicrophoneAndCameraTracks, appId, token } =
    useContext(AgoraContext);
  const { setInCall, setRole, setChannelName } = props;

  return (
    <form className="join">
      {appId === "" && (
        <p style={{ color: "red" }}>
          Please enter your Agora App ID in App.tsx and refresh the page
        </p>
      )}
      <input
        type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setInCall(true);
          setRole("host");
        }}
      >
        Join as host
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setInCall(true);
          setRole("audience");
        }}
      >
        Join as audience
      </button>
    </form>
  );
};

export default ChannelForm;
