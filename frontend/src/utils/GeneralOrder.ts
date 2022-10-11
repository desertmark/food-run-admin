import { IFoodChoice } from "./food-choices";
import { IOrder } from "./orders";
export interface IGeneralOrderItem {
  foodChoiceName: string;
  foodChoiceImage: string;
  quantity: number;
}
export class GeneralOrder {
  public items: IGeneralOrderItem[] = [];
  constructor(private foodChoices?: IFoodChoice[], private orders?: IOrder[]) {
    this.reload();
  }

  public reload() {
    this.foodChoices?.forEach((fc) => {
      const quantity = this.orders?.filter(
        (order) => order.foodChoiceKey === fc.key
      )?.length;
      if (quantity) {
        this.items.push({
          quantity,
          foodChoiceName: fc.name,
          foodChoiceImage: fc.image,
        });
      }
    });
  }
}
