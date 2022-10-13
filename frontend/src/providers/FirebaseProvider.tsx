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
import { IFoodChoice } from "../utils/food-choices";
import { wait } from "@testing-library/user-event/dist/utils";
export type AuthState = "authenticated" | "loading" | "notAuthenticated";
export interface FirebaseState {
  login: () => void;
  logout: () => void;
  user?: User;
  idTokenReuslt?: IdTokenResult;
  schedule: FirebaseObject<ISchedule>;
  orderWindow: FirebaseObject<IOrderWindow>;
  orders: FirebaseCollection<IOrder>;
  foodChoices: FirebaseCollection<IFoodChoice>;
  authState: AuthState;
  setAuthState: (authState: AuthState) => void;
}
const firebaseState = {
  orders: new FirebaseCollection(database, FirebaseCollectionEnum.Orders),
  schedule: new FirebaseObject(database, FirebaseObjectsEnum.Schedule),
  orderWindow: new FirebaseObject(database, FirebaseObjectsEnum.OrderWindow),
  foodChoices: new FirebaseCollection(
    database,
    FirebaseCollectionEnum.FoodChoices
  ),
  authState: "loading",
} as any as FirebaseState;
const FirebaseContext = createContext<FirebaseState>(firebaseState);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
export const FirebaseProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  // Contexts
  const { waitFor } = useAppState();
  const navigate = useNavigate();
  // State
  const [user, setUser] = useState<User>();
  const [authState, setAuthState] = useState<AuthState>("loading");
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
    const task = new Promise<void>((res) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const idTokenResult = await getIdTokenResult(user);
          setIdTokenResult(idTokenResult);
          setUser(user);
        } else {
          setAuthState("notAuthenticated");
        }
        res();
      });
    });
    waitFor(task);
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        ...firebaseState,
        user,
        idTokenReuslt,
        authState,
        login,
        logout,
        setAuthState,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
