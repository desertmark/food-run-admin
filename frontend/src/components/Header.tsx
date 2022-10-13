import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography as Text,
} from "@mui/material";
import { FC } from "react";
import { useFirebase } from "../providers/FirebaseProvider";
import { FoodRunLogo, Logo } from "./Logo";
import { Logout, Menu } from "@mui/icons-material";
import { useAppState } from "../providers/AppProvider";
export const Header: FC<unknown> = () => {
  const { login, logout, user } = useFirebase();
  const { openSidebar } = useAppState();
  const { idTokenReuslt } = useFirebase();
  const isAdmin = idTokenReuslt?.claims?.role === "admin";
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar sx={{ gap: 1 }}>
          {isAdmin && (
            <IconButton color="inherit" onClick={openSidebar}>
              <Menu />
            </IconButton>
          )}
          <FoodRunLogo size={64} />
          <Text variant="h6" sx={{ flexGrow: 1 }}></Text>
          {isAdmin && (
            <>
              <Text sx={{ display: { xs: "none", md: "block" } }}>
                {user?.displayName}
              </Text>
              <IconButton onClick={logout} color="inherit">
                <Logout />
              </IconButton>
            </>
          )}
          {!user && (
            <Button color="inherit" onClick={login}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
