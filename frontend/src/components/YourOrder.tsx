import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography as Text,
  useTheme,
} from "@mui/material";
import React, { FC } from "react";
import { IMyOrder } from "../utils/orders";
import { OrderWindowStatusEnum } from "../utils/schedule";

export interface YourOrderProps {
  order: IMyOrder;
  onChangeOrder?: React.MouseEventHandler;
  orderWindowStatus?: OrderWindowStatusEnum;
  hideChangeButton?: boolean;
}

export const YourOrder: FC<YourOrderProps> = ({
  order,
  onChangeOrder,
  hideChangeButton,
}) => {
  const { typography } = useTheme();

  return (
    <Card>
      <CardMedia
        component="img"
        height="256"
        image={order?.foodChoiceImage}
        alt={order.foodChoiceName}
      />
      <CardContent>
        <Text
          gutterBottom
          color="primary"
          fontSize={typography.h6.fontSize}
          component="div"
          variant="logo"
        >
          {order?.foodChoiceName}
        </Text>
      </CardContent>
      <CardActions>
        {!hideChangeButton && (
          <Button size="small" onClick={onChangeOrder}>
            Change Order
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
