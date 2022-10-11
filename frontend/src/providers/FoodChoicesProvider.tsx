import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useFirebase } from "./FirebaseProvider";
import { IFoodChoice } from "../utils/food-choices";

export interface FoodChoicesState {
  loadFoodChoices: () => void;
  foodChoices?: IFoodChoice[];
}

const FoodChoicesContext = createContext<FoodChoicesState>(
  {} as any as FoodChoicesState
);

export const useFoodChoices = () => {
  return useContext(FoodChoicesContext);
};
export const FoodChoicesProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  // Contexts
  const { foodChoices: foodChoicesApi } = useFirebase();
  // State
  const [foodChoices, setFoodChoices] = useState<IFoodChoice[]>();
  // Methods
  const loadFoodChoices = useCallback(async () => {
    const foodChoices = await foodChoicesApi.get();
    setFoodChoices(foodChoices);
  }, [foodChoicesApi]);

  useEffect(() => {
    loadFoodChoices();
  }, [loadFoodChoices]);

  return (
    <FoodChoicesContext.Provider value={{ foodChoices, loadFoodChoices }}>
      {children}
    </FoodChoicesContext.Provider>
  );
};
