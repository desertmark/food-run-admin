import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAppState } from "./AppProvider";
import { useNavigate } from "react-router-dom";
import {
  IOrderWindow,
  ISchedule,
  OrderWindowStatusEnum,
} from "../utils/schedule";
import { useFirebase } from "./FirebaseProvider";
import { IOrder } from "../utils/orders";
import { startAt } from "firebase/database";
import { today } from "../utils/today";
export interface OrdersState {
  loadSchedule: () => void;
  loadOrderWindow: () => void;
  loadOrders: () => void;
  updateOrderWindowStatus: (orderWindowStatus: OrderWindowStatusEnum) => void;
  orderWindow?: IOrderWindow;
  schedule?: ISchedule;
  orders: IOrder[];
}

const OrdersContext = createContext<OrdersState>({} as any as OrdersState);

export const useOrders = () => {
  return useContext(OrdersContext);
};
export const OrdersProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  // Contexts
  const {
    orderWindow: orderWindowApi,
    schedule: scheduleApi,
    orders: ordersApi,
  } = useFirebase();
  // State
  const [orderWindow, setOrderWindow] = useState<IOrderWindow>();
  const [schedule, setSchedule] = useState<ISchedule>();
  const [orders, setOrders] = useState<IOrder[]>([]);
  // Methods
  const loadOrders = useCallback(async () => {
    const orders = await ordersApi.query("date", startAt(today()));
    setOrders(orders);
  }, [ordersApi]);

  const loadSchedule = useCallback(async () => {
    const schedule = await scheduleApi.get();
    setSchedule(schedule);
  }, [scheduleApi]);

  const loadOrderWindow = useCallback(async () => {
    const orderWindow = await orderWindowApi.get();
    setOrderWindow(orderWindow);
  }, [orderWindowApi]);

  const updateOrderWindowStatus = useCallback(
    async (orderWindowStatus: OrderWindowStatusEnum) => {
      await orderWindowApi.setProperty("status", orderWindowStatus);
      setOrderWindow({
        ...orderWindow!,
        status: orderWindowStatus,
      });
    },
    [orderWindow, orderWindowApi]
  );

  return (
    <OrdersContext.Provider
      value={{
        loadOrders,
        loadSchedule,
        loadOrderWindow,
        updateOrderWindowStatus,
        orderWindow,
        schedule,
        orders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
