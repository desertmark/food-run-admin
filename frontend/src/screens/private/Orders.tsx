import { Fastfood } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { FC } from "react";
import { Screen } from "../../components/Screen";
import { ScreenTitle } from "../../components/ScreenTitle";

export const OrdersScreen: FC = () => {
  return (
    <Screen role="orders" sx={{ gap: 2 }}>
      <ScreenTitle
        text="Take your pick!"
        Icon={Fastfood}
        caption="The food choices are:"
      />
      <Divider />
    </Screen>
  );
};
