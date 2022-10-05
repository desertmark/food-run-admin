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
        <FirebaseProvider>
          <BackendProvider>{children}</BackendProvider>
        </FirebaseProvider>
      </AppProvider>
    </ThemeProvider>
  );
};
