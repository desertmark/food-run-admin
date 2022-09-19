import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./Home";

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <PublicRoutes />
    </BrowserRouter>
  );
};

export const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<HomeScreen />}></Route>
  </Routes>
);
