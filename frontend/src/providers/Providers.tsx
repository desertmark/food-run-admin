import { ThemeProvider } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { theme } from "../configs/theme";
import { BackendProvider } from "./BackendProvider";

export const Providers: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <BackendProvider>{children}</BackendProvider>
    </ThemeProvider>
  );
};
