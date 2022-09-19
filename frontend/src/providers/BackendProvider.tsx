import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BackendApi, GetConfigResponse } from "../api/backend.api";
import { backendConfig } from "../configs/backend";

export interface BackendState {
  config: GetConfigResponse;
}
const BackendContext = createContext<BackendState>(null as any as BackendState);

export const useBackend = () => {
  return useContext(BackendContext);
};
export const BackendProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  // State
  const [backend] = useState<BackendApi>(new BackendApi(backendConfig.apiUrl));
  const [config, setConfig] = useState<GetConfigResponse>({} as any);

  // Methods
  const loadConfig = useCallback(async () => {
    if (backend) {
      const config = await backend.getConfig();
      setConfig(config);
    }
  }, [backend]);

  // Effects
  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  return (
    <BackendContext.Provider value={{ config }}>
      {children}
    </BackendContext.Provider>
  );
};
