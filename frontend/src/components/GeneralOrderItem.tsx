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
import { IGeneralOrderItem } from "../utils/GeneralOrder";

export interface GeneralOrderItemProps {
  item: IGeneralOrderItem;
}

export const GeneralOrderItem: FC<GeneralOrderItemProps> = ({ item }) => {
  const { spacing } = useTheme();
  return (
    <Card>
      <CardContent
        style={{ paddingTop: spacing(1), paddingBottom: spacing(1) }}
      >
        <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
          <Avatar
            src={item.foodChoiceImage}
            sx={{ height: spacing(8), width: spacing(8) }}
          />
          <Box>
            <Text>{item.foodChoiceName}</Text>
            <Chip
              label={`Quantity: ${item.quantity}`}
              color="secondary"
              size="small"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
