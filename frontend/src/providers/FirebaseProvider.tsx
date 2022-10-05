import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, azureProvider } from "../configs/firebase";
import {
  getRedirectResult,
  OAuthProvider,
  signInWithRedirect,
  User,
  UserCredential,
} from "firebase/auth";
import { useAppState } from "./AppProvider";
export interface FirebaseState {
  login: () => void;
  logout: () => void;
  user: User | undefined;
}

const FirebaseContext = createContext<FirebaseState>(
  null as any as FirebaseState
);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
export const FirebaseProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  // Contexts
  const { setIsLoading } = useAppState();
  // State
  const [user, setUser] = useState<User>();
  // Methods
  /**
   * Starts login flow by redirecting to login page.
   */
  const login = () => {
    signInWithRedirect(auth, azureProvider);
  };

  /**
   * Tries to get login result.
   * It will succeed if we are being redirected back after login.
   * otherwise fails.
   */
  const getLoginResult = async () => {
    const userCredentials = await getRedirectResult(auth);
    if (userCredentials?.user) {
      setUser(userCredentials?.user);
    }
  };

  const logout = async () => {
    await auth.signOut();
    setUser(undefined);
  };

  // Effects
  useEffect(() => {
    getLoginResult();
  }, []);

  /**
   * Listen for auth state changes to load session if exists.
   */
  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
      setIsLoading(false);
    });
  }, [setIsLoading]);

  return (
    <FirebaseContext.Provider value={{ login, user, logout }}>
      {children}
    </FirebaseContext.Provider>
  );
};
