import { AccessTime, AccountCircle, Fastfood } from "@mui/icons-material";
import { Divider, Typography as Text } from "@mui/material";
import { FC, useEffect } from "react";
import { OrderWindowControl } from "../components/OrderWindowControl";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { useOrders } from "../providers/OrdersProvider";

export const OrdersScreen: FC = () => {
  const { loadOrderWindow, updateOrderWindowStatus, loadOrders, orderWindow } =
    useOrders();

  useEffect(() => {
    loadOrderWindow();
  }, [loadOrderWindow]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <Screen role="orders" sx={{ gap: 2 }}>
      <ScreenTitle
        text="Orders"
        Icon={Fastfood}
        caption="You can collect here the general order and control the order window."
      />
      <Divider />
      <ScreenTitle
        text="Order Window"
        Icon={AccessTime}
        subtitle
        caption="Change the state of the order windows to let everybody know you are taking orders or not."
      />

      <OrderWindowControl
        orderWindow={orderWindow}
        onStatusChange={updateOrderWindowStatus}
      />

      <Divider />
      <ScreenTitle
        text="General Order"
        Icon={Fastfood}
        subtitle
        caption="This is what you need to order."
      />

      <Divider />
      <ScreenTitle
        text="Order Details"
        Icon={AccountCircle}
        subtitle
        caption="Check here who order each plate of the general order."
      />
    </Screen>
  );
};
