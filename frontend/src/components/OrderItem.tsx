import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography as Text,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { IOrder } from "../utils/orders";
import { stringAvatar } from "../utils/string-avatar";

export interface OrderItemProps {
  order: IOrder;
}

export const OrderItem: FC<OrderItemProps> = ({ order }) => {
  const { spacing } = useTheme();
  return (
    <Card>
      <CardContent
        style={{ paddingTop: spacing(1), paddingBottom: spacing(1) }}
      >
        <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
          <Avatar
            {...stringAvatar(
              order.userDisplayName || order.userEmail || order.userId,
              spacing(8)
            )}
          />
          <Box>
            <Text>
              {order.userDisplayName || order.userEmail || order.userId}
            </Text>
            <Chip label={order.foodChoiceName} color="primary" size="small" />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
