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
import { Logout } from "@mui/icons-material";
export const Header: FC<unknown> = () => {
  const { login, logout, user } = useFirebase();

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar sx={{ gap: 1 }}>
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
