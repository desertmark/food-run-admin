import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography as Text,
} from "@mui/material";
import { FC } from "react";
import { useFirebase } from "../providers/FirebaseProvider";
import { Logo } from "./Logo";
import { Logout, Menu } from "@mui/icons-material";
import { useAppState } from "../providers/AppProvider";
export const Header: FC<unknown> = () => {
  const { login, logout, user } = useFirebase();
  const { openSidebar } = useAppState();

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar sx={{ gap: 1 }}>
          {user && (
            <IconButton color="inherit" onClick={openSidebar}>
              <Menu />
            </IconButton>
          )}
          <Logo />
          <Text variant="h6" sx={{ flexGrow: 1 }}>
            Food Run
          </Text>
          {user && (
            <>
              <Text>{user?.displayName}</Text>
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
