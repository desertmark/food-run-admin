import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export interface AppState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
const AppContext = createContext<AppState>(null as any as AppState);

export const useAppState = () => {
  return useContext(AppContext);
};
export const AppProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
};
