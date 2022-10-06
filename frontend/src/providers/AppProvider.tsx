import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export interface AppState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  setIsLoading: (isLoading: boolean) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}
const AppContext = createContext<AppState>(null as any as AppState);

export const useAppState = () => {
  return useContext(AppContext);
};
export const AppProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
