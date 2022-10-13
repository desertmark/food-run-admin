import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { useFirebase } from "../providers/FirebaseProvider";
import { HomeScreen } from "./Home";
import { OrdersScreen } from "./Orders";
import { ScheduleScreen } from "./Schedule";
import { UnauthorizedScreen } from "./Unauthorized";
import { UsersScreen } from "./Users";

export const Router: FC = () => {
  const { authState, idTokenReuslt } = useFirebase();
  const isAdmin = idTokenReuslt?.claims?.role === "admin";

  if (authState === "authenticated") {
    if (isAdmin) {
      return <PrivateRoutes />;
    }
    return <UnauthorizedRoute />;
  }
  return <PublicRoutes />;
};

export const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeScreen />}></Route>
  </Routes>
);

export const PrivateRoutes = () => (
  <Routes>
    <Route path="/" element={<OrdersScreen />}></Route>
    <Route path="/users" element={<UsersScreen />}></Route>
    <Route path="/schedule" element={<ScheduleScreen />}></Route>
  </Routes>
);

export const UnauthorizedRoute = () => (
  <Routes>
    <Route path="/" element={<UnauthorizedScreen />} />
  </Routes>
);
