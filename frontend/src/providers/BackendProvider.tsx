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
import { useFirebase } from "./FirebaseProvider";

export interface BackendState {
  config: GetConfigResponse;
  users: any[];
  loadUsers: () => void;
}
const BackendContext = createContext<BackendState>(null as any as BackendState);

export const useBackend = () => {
  return useContext(BackendContext);
};
export const BackendProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  // Contexts
  const { idTokenReuslt, setAuthState } = useFirebase();
  // State
  const [backend] = useState<BackendApi>(new BackendApi(backendConfig.apiUrl));
  const [config, setConfig] = useState<GetConfigResponse>({} as any);
  const [users, setUsers] = useState<any>();

  // Methods
  const loadConfig = useCallback(async () => {
    if (backend) {
      const config = await backend.getConfig();
      setConfig(config);
    }
  }, [backend]);

  const loadUsers = useCallback(async () => {
    const users = await backend.getUsers();
    setUsers(users);
  }, [backend]);

  // Effects
  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  useEffect(() => {
    if (idTokenReuslt?.token) {
      backend.setAccessToken(idTokenReuslt?.token!);
      setAuthState("authenticated");
    }
  }, [backend, idTokenReuslt?.token, setAuthState]);

  return (
    <BackendContext.Provider value={{ config, loadUsers, users }}>
      {children}
    </BackendContext.Provider>
  );
};
