import { Task } from "@mui/icons-material";
import { wait } from "@testing-library/user-event/dist/utils";
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
import { useAppState } from "./AppProvider";
import { useFirebase } from "./FirebaseProvider";

export interface BackendState {
  users: any[];
  loadUsers: () => void;
  updateUser: (req: { uid: string; role: string }) => void;
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
  const { waitFor, setConfig } = useAppState();
  // State
  const [backend] = useState<BackendApi>(new BackendApi(backendConfig.apiUrl));
  const [users, setUsers] = useState<any>();

  // Methods
  const loadConfig = useCallback(async () => {
    if (backend) {
      const task = backend.getConfig();
      const config = await backend.getConfig();
      waitFor(task);
      setConfig(config);
    }
  }, [backend, setConfig, waitFor]);

  const loadUsers = useCallback(async () => {
    const task = backend.getUsers();
    const users = await task;
    setUsers(users);
    waitFor(task);
  }, [backend, waitFor]);

  const updateUser = useCallback(
    async (req: { uid: string; role: string }) => {
      waitFor(backend.updateUser(req));
    },
    [backend, waitFor]
  );

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
    <BackendContext.Provider
      value={{
        loadUsers,
        users,
        updateUser,
      }}
    >
      {children}
    </BackendContext.Provider>
  );
};
