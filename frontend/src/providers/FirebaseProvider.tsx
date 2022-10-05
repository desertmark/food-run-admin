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
  getIdTokenResult,
  getRedirectResult,
  IdTokenResult,
  OAuthCredential,
  OAuthProvider,
  signInWithRedirect,
  User,
} from "firebase/auth";
import { useAppState } from "./AppProvider";
export interface FirebaseState {
  login: () => void;
  logout: () => void;
  user?: User;
  oAuthCredentials?: OAuthCredential;
  idTokenReuslt?: IdTokenResult;
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
  const [oAuthCredentials, setOAuthCredentials] = useState<OAuthCredential>();
  const [idTokenReuslt, setIdTokenResult] = useState<IdTokenResult>();
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
  const getLoginResult = useCallback(async () => {
    const userCredentials = await getRedirectResult(auth);
    // if (userCredentials?.user) {
    //   const credentials = OAuthProvider.credentialFromResult(userCredentials)!;
    //   saveCredentials(credentials);
    //   setOAuthCredentials(credentials);
    //   setUser(userCredentials?.user);
    // }
  }, []);

  const logout = async () => {
    await auth.signOut();
    setUser(undefined);
  };

  // const saveCredentials = (credentials: OAuthCredential) => {
  //   localStorage.setItem("session", JSON.stringify(credentials.toJSON()));
  // };

  // const recoverCredentials = (): OAuthCredential => {
  //   const session = localStorage.getItem("session");
  //   return OAuthProvider.credentialFromJSON(session!);
  // };

  // Effects
  useEffect(() => {
    getLoginResult();
  }, [getLoginResult]);

  /**
   * Listen for auth state changes to load session if exists.
   */
  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await getIdTokenResult(user);
        setIdTokenResult(idTokenResult);
        setUser(user);
      }
      setIsLoading(false);
    });
  }, [setIsLoading]);

  return (
    <FirebaseContext.Provider
      value={{ login, user, logout, oAuthCredentials, idTokenReuslt }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
