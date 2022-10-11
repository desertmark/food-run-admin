import { AccessTime, AccountCircle, Fastfood } from "@mui/icons-material";
import { Chip, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect } from "react";
import { GeneralOrderItem } from "../components/GeneralOrderItem";
import { OrderItem } from "../components/OrderItem";
import { OrderWindowControl } from "../components/OrderWindowControl";
import { Screen } from "../components/Screen";
import { ScreenTitle } from "../components/ScreenTitle";
import { useOrders } from "../providers/OrdersProvider";

export const OrdersScreen: FC = () => {
  const {
    loadOrderWindow,
    updateOrderWindowStatus,
    loadOrders,
    orderWindow,
    generalOrder,
    orders,
  } = useOrders();

  useEffect(() => {
    loadOrderWindow();
  }, [loadOrderWindow]);

  // useEffect(() => {
  //   loadOrders();
  // }, [loadOrders]);

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
      {generalOrder?.items?.map((item, index) => (
        <GeneralOrderItem item={item} key={`general-order-item-${index}`} />
      ))}
      {!generalOrder?.items?.length && (
        <Box display="flex" justifyContent="center">
          <Chip label="No orders yet." color="secondary" />
        </Box>
      )}
      <Divider />
      <ScreenTitle
        text="Order Details"
        Icon={AccountCircle}
        subtitle
        caption="Check here who order each plate of the general order."
      />
      {orders?.map((item, index) => (
        <OrderItem order={item} key={`order-item-${index}`} />
      ))}
      {!orders?.length && (
        <Box display="flex" justifyContent="center">
          <Chip label="No orders yet." color="primary" />
        </Box>
      )}
    </Screen>
  );
};
