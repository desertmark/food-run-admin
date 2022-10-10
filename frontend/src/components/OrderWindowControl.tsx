import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FC } from "react";
import { IOrderWindow, OrderWindowStatusEnum } from "../utils/schedule";
export interface OrderWindowControlProps {
  orderWindow?: IOrderWindow;
  onStatusChange?: (status: OrderWindowStatusEnum) => void;
}
export const OrderWindowControl: FC<OrderWindowControlProps> = ({
  orderWindow,
  onStatusChange,
}) => {
  const handleStatusChanged = (e: any) => {
    onStatusChange!(e.target.value);
  };
  return (
    <ToggleButtonGroup
      color="primary"
      value={orderWindow?.status}
      exclusive
      onChange={handleStatusChanged}
    >
      <ToggleButton
        value={OrderWindowStatusEnum.New}
        // disabled={orderWindow?.status === OrderWindowStatusEnum.New}
      >
        New
      </ToggleButton>
      <ToggleButton
        value={OrderWindowStatusEnum.Open}
        // disabled={orderWindow?.status === OrderWindowStatusEnum.Open}
      >
        Open
      </ToggleButton>
      <ToggleButton
        value={OrderWindowStatusEnum.Closed}
        // disabled={orderWindow?.status === OrderWindowStatusEnum.Closed}
      >
        Closed
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
