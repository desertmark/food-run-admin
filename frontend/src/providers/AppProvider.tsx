import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AppState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  isHubOpen: boolean;
  hubTemplate: JSX.Element;
  waitFor: <T>(task: Promise<T>) => Promise<T>;
  openSidebar: () => void;
  closeSidebar: () => void;
  openHub: (template: JSX.Element) => void;
  closeHub: () => void;
}
const AppContext = createContext<AppState>(null as any as AppState);

export const useAppState = () => {
  return useContext(AppContext);
};
export const AppProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isHubOpen, setIsHubOpen] = useState<boolean>(false);
  const [hubTemplate, setHubTemplate] = useState<JSX.Element>(<></>);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openHub = (template: JSX.Element) => {
    setHubTemplate(template);
    setIsHubOpen(true);
  };

  const closeHub = () => {
    setIsHubOpen(false);
  };

  const waitFor = useCallback(async <T,>(task: Promise<T>): Promise<T> => {
    setTasks((t) => [...t, task]);
    task.finally(() => {
      setTasks((currentTasks) => {
        return currentTasks.filter((t) => t !== task);
      });
    });
    return task;
  }, []);

  useEffect(() => {
    if (tasks.length === 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [tasks]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        isSidebarOpen,
        isHubOpen,
        hubTemplate,
        waitFor,
        openSidebar,
        closeSidebar,
        openHub,
        closeHub,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
