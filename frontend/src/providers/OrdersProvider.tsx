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
import { orderByChild, startAt } from "firebase/database";
import { today } from "../utils/today";
import { GeneralOrder } from "../utils/GeneralOrder";
import { useFoodChoices } from "./FoodChoicesProvider";
export interface OrdersState {
  loadSchedule: () => void;
  loadOrderWindow: () => void;
  loadOrders: () => void;
  updateOrderWindowStatus: (orderWindowStatus: OrderWindowStatusEnum) => void;
  orderWindow?: IOrderWindow;
  schedule?: ISchedule;
  generalOrder?: GeneralOrder;
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
  const { foodChoices } = useFoodChoices();
  // State
  const [orderWindow, setOrderWindow] = useState<IOrderWindow>();
  const [schedule, setSchedule] = useState<ISchedule>();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [generalOrder, setGeneralOrder] = useState<GeneralOrder>();
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

  const subscribeToOrders = useCallback(() => {
    const updateMyOrder = (order: IOrder, key: string) =>
      setOrders((orders) => {
        order.orderId = key;
        const orderIndex = orders.findIndex((o) => o.orderId === key);
        // Update if exists
        if (orderIndex !== -1) {
          orders[orderIndex] = order;
          return [...orders];
        }
        // Add if not
        return [...orders, order];
      });
    const unsubscribeAddUpdate = ordersApi.onItemAddedOrUpdated(
      updateMyOrder,
      orderByChild("date"),
      startAt(today())
    );
    const unsubscribedOnRemoved = ordersApi.onItemRemoved((item, key) =>
      setOrders((orders) => {
        return orders.filter((o) => o.orderId !== key);
      })
    );
    return () => {
      unsubscribeAddUpdate();
      unsubscribedOnRemoved();
    };
  }, [ordersApi]);

  useEffect(() => {
    setGeneralOrder(new GeneralOrder(foodChoices, orders));
  }, [orders, foodChoices]);

  useEffect(() => {
    return subscribeToOrders();
  }, [subscribeToOrders]);

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
        generalOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
