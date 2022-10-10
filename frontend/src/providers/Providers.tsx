import { ThemeProvider } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { theme } from "../configs/theme";
import { AppProvider } from "./AppProvider";
import { BackendProvider } from "./BackendProvider";
import { FirebaseProvider } from "./FirebaseProvider";
import { OrdersProvider } from "./OrdersProvider";

export const Providers: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppProvider>
          <FirebaseProvider>
            <BackendProvider>
              <OrdersProvider>{children}</OrdersProvider>
            </BackendProvider>
          </FirebaseProvider>
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
