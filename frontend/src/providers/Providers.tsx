import { ThemeProvider } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { theme } from "../configs/theme";
import { AppProvider } from "./AppProvider";
import { BackendProvider } from "./BackendProvider";
import { FirebaseProvider } from "./FirebaseProvider";

export const Providers: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <BackendProvider>
          <FirebaseProvider>{children}</FirebaseProvider>
        </BackendProvider>
      </AppProvider>
    </ThemeProvider>
  );
};
