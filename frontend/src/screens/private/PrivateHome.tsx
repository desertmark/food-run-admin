import { Home } from "@mui/icons-material";
import { Box, Divider, Typography as Text } from "@mui/material";
import { FC } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Screen } from "../../components/Screen";
import { ScreenTitle } from "../../components/ScreenTitle";
import { YourOrder } from "../../components/YourOrder";
import { useOrders } from "../../providers/OrdersProvider";

export const PrivateHomeScreen: FC = () => {
  const { myOrder } = useOrders();
  const navigate = useNavigate();
  return (
    <Screen role="home" sx={{ gap: 2 }}>
      <ScreenTitle text="Your order!" Icon={Home} caption="Your order today" />
      <Divider />

      <Box display="flex" alignItems="center" flexDirection="column" flex={1}>
        {myOrder && (
          <YourOrder
            order={myOrder}
            onChangeOrder={() => navigate("/orders")}
          />
        )}
      </Box>
    </Screen>
  );
};
