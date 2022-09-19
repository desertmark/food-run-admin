import { ThemeProvider } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { theme } from "../configs/theme";

export const Providers: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
