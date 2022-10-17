import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { useFirebase } from "../providers/FirebaseProvider";
import { AdminOrdersScreen } from "./private/admin/AdminOrders";
import { OrdersScreen } from "./private/Orders";
import { ScheduleScreen } from "./private/admin/Schedule";
import { UsersScreen } from "./private/admin/Users";
import { PrivateHomeScreen } from "./private/PrivateHome";
import { PublicHomeScreen } from "./public/PublicHome";
import { UnauthorizedScreen } from "./Unauthorized";

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
    <Route path="/" element={<PublicHomeScreen />}></Route>
  </Routes>
);

export const PrivateRoutes = () => (
  <Routes>
    <Route path="/" element={<PrivateHomeScreen />}></Route>
    <Route path="/orders" element={<OrdersScreen />}></Route>
    <Route path="/admin" element={<AdminOrdersScreen />}></Route>
    <Route path="/admin/users" element={<UsersScreen />}></Route>
    <Route path="/admin/schedule" element={<ScheduleScreen />}></Route>
  </Routes>
);

export const UnauthorizedRoute = () => (
  <Routes>
    <Route path="/" element={<UnauthorizedScreen />} />
  </Routes>
);
