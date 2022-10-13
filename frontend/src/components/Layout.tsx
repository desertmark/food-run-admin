import { styled } from "@mui/material/styles";
import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { useAppState } from "../providers/AppProvider";
import { useFirebase } from "../providers/FirebaseProvider";
import { Header } from "./Header";
import { Hub } from "./Hub";
import { Loader } from "./Loader";
import { Sidebar } from "./Sidebar";

const LayoutComponent: FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, ...rest }) => {
  const { isLoading } = useAppState();
  return (
    // eslint-disable-next-line jsx-a11y/aria-role
    <div role="layout" {...rest}>
      <Header />
      <Sidebar />
      {isLoading ? <Loader /> : children}
      <Hub />
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
