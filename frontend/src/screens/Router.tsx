import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useFirebase } from "../providers/FirebaseProvider";
import { HomeScreen } from "./Home";
import { UsersScreen } from "./Users";

export const Router: FC = () => {
  const { user } = useFirebase();
  return (
    <BrowserRouter>{user ? <PrivateRoutes /> : <PublicRoutes />}</BrowserRouter>
  );
};

export const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeScreen />}></Route>
  </Routes>
);

export const PrivateRoutes = () => (
  <Routes>
    <Route path="/" element={<UsersScreen />}></Route>
  </Routes>
);
