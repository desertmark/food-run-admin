import { styled } from "@mui/material/styles";
import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { useAppState } from "../providers/AppProvider";
import { Header } from "./Header";
import { Loader } from "./Loader";
const LayoutComponent: FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, ...rest }) => {
  const { isLoading } = useAppState();
  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <div role="layout" {...rest}>
      <Header />
      {isLoading ? <Loader /> : children}
    </div>
  );
};

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
