import { styled } from "@mui/material/styles";
import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { Header } from "./Header";
const LayoutComponent: FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, ...rest }) => (
  // eslint-disable-next-line jsx-a11y/aria-role
  <div role="layout" {...rest}>
    <Header />
    {children}
  </div>
);

export const Layout = styled(LayoutComponent, { label: "layout" })(
  ({ theme }) => {
    return {
      backgroundColor: theme.palette.background.default,
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    };
  }
);
