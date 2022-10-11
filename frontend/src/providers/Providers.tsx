import { ThemeProvider } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { theme } from "../configs/theme";
import { AppProvider } from "./AppProvider";
import { BackendProvider } from "./BackendProvider";
import { FirebaseProvider } from "./FirebaseProvider";
import { FoodChoicesProvider } from "./FoodChoicesProvider";
import { OrdersProvider } from "./OrdersProvider";

export const Providers: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppProvider>
          <FirebaseProvider>
            <BackendProvider>
              <FoodChoicesProvider>
                <OrdersProvider>{children}</OrdersProvider>
              </FoodChoicesProvider>
            </BackendProvider>
          </FirebaseProvider>
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
