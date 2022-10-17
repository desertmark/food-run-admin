import { Home } from "@mui/icons-material";
import { Divider, Typography as Text } from "@mui/material";
import { FC } from "react";
import { Screen } from "../../components/Screen";
import { ScreenTitle } from "../../components/ScreenTitle";

export const PrivateHomeScreen: FC = () => {
  return (
    <Screen role="home" sx={{ gap: 2 }}>
      <ScreenTitle text="Your order!" Icon={Home} caption="Your order today" />
      <Divider />
    </Screen>
  );
};
