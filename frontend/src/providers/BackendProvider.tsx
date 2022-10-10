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
  config: GetConfigResponse;
  users: any[];
  schedule: any;
  loadUsers: () => void;
  loadSchedule: () => void;
}
const BackendContext = createContext<BackendState>(null as any as BackendState);

export const useBackend = () => {
  return useContext(BackendContext);
};
export const BackendProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  // Contexts
  const { idTokenReuslt } = useFirebase();
  const { setIsLoading } = useAppState();
  // State
  const [backend] = useState<BackendApi>(new BackendApi(backendConfig.apiUrl));
  const [config, setConfig] = useState<GetConfigResponse>({} as any);
  const [users, setUsers] = useState<any>();
  const [schedule, setSchedule] = useState<any>();

  // Methods
  const loadConfig = useCallback(async () => {
    if (backend) {
      const config = await backend.getConfig();
      setConfig(config);
    }
  }, [backend]);

  const loadUsers = useCallback(async () => {
    try {
      const users = await backend.getUsers();
      setUsers(users);
    } finally {
    }
  }, [backend]);

  const loadSchedule = useCallback(async () => {
    try {
      const schedule = await backend.getSchedule();
      setSchedule(schedule);
    } finally {
    }
  }, [backend]);

  // Effects
  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  useEffect(() => {
    if (idTokenReuslt?.token) {
      backend.setAccessToken(idTokenReuslt?.token!);
    }
  }, [backend, idTokenReuslt?.token]);

  return (
    <BackendContext.Provider
      value={{ config, loadUsers, loadSchedule, users, schedule }}
    >
      {children}
    </BackendContext.Provider>
  );
};
