import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  IOrderWindow,
  ISchedule,
  OrderWindowStatusEnum,
} from "../utils/schedule";
import { useFirebase } from "./FirebaseProvider";
import { IMyOrder, IOrder } from "../utils/orders";
import { orderByChild, startAt } from "firebase/database";
import { today } from "../utils/today";
import { GeneralOrder } from "../utils/GeneralOrder";
import { useFoodChoices } from "./FoodChoicesProvider";
import { IFoodChoice } from "../utils/food-choices";

export interface OrdersState {
  loadSchedule: () => void;
  loadOrderWindow: () => void;
  loadOrders: () => void;
  updateOrderWindowStatus: (orderWindowStatus: OrderWindowStatusEnum) => void;
  makeOrder: (fc: IFoodChoice) => void;
  myOrder?: IMyOrder;
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
  const { user } = useFirebase();
  // State
  const [orderWindow, setOrderWindow] = useState<IOrderWindow>();
  const [schedule, setSchedule] = useState<ISchedule>();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [generalOrder, setGeneralOrder] = useState<GeneralOrder>();
  const [myOrder, _setMyOrder] = useState<IMyOrder>();
  // Methods

  // Set the current user's current order.
  const setMyOrder = useCallback(
    (order: IOrder) => {
      const fc = foodChoices?.find((fc) => order.foodChoiceKey === fc.key);
      _setMyOrder({
        ...order,
        foodChoiceImage: fc?.image!,
      });
    },
    [foodChoices]
  );

  // Loads orders from firebase
  const loadOrders = useCallback(async () => {
    const orders = await ordersApi.query("date", startAt(today()));
    setOrders(orders);
  }, [ordersApi]);

  // Loads the schedule from firebase
  const loadSchedule = useCallback(async () => {
    const schedule = await scheduleApi.get();
    setSchedule(schedule);
  }, [scheduleApi]);

  // Loads the order window from firebase
  const loadOrderWindow = useCallback(async () => {
    const orderWindow = await orderWindowApi.get();
    setOrderWindow(orderWindow);
  }, [orderWindowApi]);

  // Changes the order windows status property
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

  // Listen for addition and updates in the orders collection
  const subscribeToOrders = useCallback(() => {
    const updateMyOrder = (order: IOrder, key: string) =>
      setOrders((orders) => {
        order.orderId = key;
        const orderIndex = orders.findIndex((o) => o.orderId === key);
        // set my order if user match current user
        if (order.userId === user?.uid) {
          setMyOrder(order);
        }
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
  }, [ordersApi, setMyOrder, user?.uid]);

  // Push a new order from the current user or update the existing order.
  const makeOrder = useCallback(
    async (fc: IFoodChoice) => {
      const order = {
        date: Date.now(),
        foodChoiceKey: fc.key,
        foodChoiceName: fc.name,
        userDisplayName: user?.displayName!,
        userEmail: user?.email!,
        userId: user?.uid!,
      };
      if (!myOrder) {
        await ordersApi.push(order);
      } else {
        await ordersApi.update(myOrder.orderId!, order);
      }
    },
    [myOrder, ordersApi, user?.displayName, user?.email, user?.uid]
  );

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
        makeOrder,
        myOrder,
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
