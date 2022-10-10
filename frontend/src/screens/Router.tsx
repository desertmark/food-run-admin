import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { useFirebase } from "../providers/FirebaseProvider";
import { HomeScreen } from "./Home";
import { OrdersScreen } from "./Orders";
import { ScheduleScreen } from "./Schedule";
import { UsersScreen } from "./Users";

export const Router: FC = () => {
  const { user } = useFirebase();
  return user ? <PrivateRoutes /> : <PublicRoutes />;
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
