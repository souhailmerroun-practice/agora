import React from "react";
import {
  ClientConfig,
} from "agora-rtc-react";

/**
 * Initial Values
 */
const appId = "c7f382d8d1264ab997f69189dac8eb91";
const config: ClientConfig = {
  mode: "live",
  codec: "vp8",
};
const initialValues = {
  appId,
  config
};

/**
 * Context
 */

type AgoraConfigContextType = {
  appId: string;
  config: ClientConfig
};

export const AgoraConfigContext =
  React.createContext<AgoraConfigContextType>(initialValues);

/**
 * Provider
 */

export const AgoraConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AgoraConfigContext.Provider value={initialValues}>
      {children}
    </AgoraConfigContext.Provider>
  );
};
