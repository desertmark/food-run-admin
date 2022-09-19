import { AppBar, Button, Toolbar, Typography as Text } from "@mui/material";
import { FC } from "react";
import { Logo } from "./Logo";

export const Header: FC<unknown> = () => {
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar sx={{ gap: 1 }}>
          <Logo />
          <Text variant="h6" sx={{ flexGrow: 1 }}>
            Food Run
          </Text>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
