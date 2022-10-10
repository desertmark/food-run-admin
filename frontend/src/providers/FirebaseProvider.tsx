import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, azureProvider, database } from "../configs/firebase";
import {
  getIdTokenResult,
  getRedirectResult,
  IdTokenResult,
  signInWithRedirect,
  User,
} from "firebase/auth";
import { useAppState } from "./AppProvider";
import { useNavigate } from "react-router-dom";
import { FirebaseObject, FirebaseObjectsEnum } from "../utils/FirebaseObject";
import { IOrderWindow, ISchedule } from "../utils/schedule";
import {
  FirebaseCollection,
  FirebaseCollectionEnum,
} from "../utils/FirebaseCollection";
import { IOrder } from "../utils/orders";
export interface FirebaseState {
  login: () => void;
  logout: () => void;
  user?: User;
  idTokenReuslt?: IdTokenResult;
  schedule: FirebaseObject<ISchedule>;
  orderWindow: FirebaseObject<IOrderWindow>;
  orders: FirebaseCollection<IOrder>;
}

const FirebaseContext = createContext<FirebaseState>(
  {} as any as FirebaseState
);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
export const FirebaseProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  // Contexts
  const { setIsLoading } = useAppState();
  const navigate = useNavigate();
  // State
  const [user, setUser] = useState<User>();
  const [idTokenReuslt, setIdTokenResult] = useState<IdTokenResult>();
  // Methods
  /**
   * Starts login flow by redirecting to login page.
   */
  const login = () => {
    signInWithRedirect(auth, azureProvider);
  };
  const logout = async () => {
    await auth.signOut();
    setUser(undefined);
    navigate("/");
  };

  // Effects

  /**
   * Tries to get login result.
   * It will succeed if we are being redirected back after login.
   * otherwise fails.
   */
  useEffect(() => {
    getRedirectResult(auth);
  }, []);

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
      value={{
        orders: new FirebaseCollection(database, FirebaseCollectionEnum.Orders),
        schedule: new FirebaseObject(database, FirebaseObjectsEnum.Schedule),
        orderWindow: new FirebaseObject(
          database,
          FirebaseObjectsEnum.OrderWindow
        ),
        user,
        idTokenReuslt,
        login,
        logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
