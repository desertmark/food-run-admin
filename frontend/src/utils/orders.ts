export interface IOrder {
  orderId?: string;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  foodChoiceKey: string;
  foodChoiceName: string;
  date: number;
}

export interface IMyOrder extends IOrder {
  foodChoiceImage: string;
}
