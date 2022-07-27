import { useContext } from "react";
import { AgoraConfigContext } from "./AgoraConfigProvider";

const ChannelForm = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { appId } = useContext(AgoraConfigContext);
  const { setInCall, setChannelName } = props;

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
        }}
      >
        Join
      </button>
    </form>
  );
};

export default ChannelForm;
