import { Fastfood } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListItemButton,
  Modal,
  Typography as Text,
} from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import { Screen } from "../../components/Screen";
import { ScreenTitle } from "../../components/ScreenTitle";
import { YourOrder } from "../../components/YourOrder";
import { useAppState } from "../../providers/AppProvider";
import { useFoodChoices } from "../../providers/FoodChoicesProvider";
import { useOrders } from "../../providers/OrdersProvider";
import { IFoodChoice } from "../../utils/food-choices";

export const OrdersScreen: FC = () => {
  const { foodChoices } = useFoodChoices();
  const { makeOrder } = useOrders();
  const { openHub, closeHub } = useAppState();
  const navigate = useNavigate();

  const confirmOrder = async (fc: IFoodChoice) => {
    await makeOrder(fc);
    closeHub();
    navigate("/");
  };

  const handleFoodChoice = (fc: IFoodChoice) => {
    openHub(
      <>
        <Text color="primary" textAlign="center" variant="logo">
          Do you want to continue with this choice ?
        </Text>
        <YourOrder
          order={{ foodChoiceName: fc.name, foodChoiceImage: fc.image } as any}
          hideChangeButton
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => confirmOrder(fc)}
        >
          Yes
        </Button>
        <Button variant="outlined" onClick={() => closeHub()}>
          Cancel
        </Button>
      </>
    );
  };
  return (
    <Screen role="orders" sx={{ gap: 2 }}>
      <ScreenTitle
        text="Take your pick!"
        Icon={Fastfood}
        caption="The food choices are:"
      />
      <Divider />

      <ImageList sx={{ maxWidth: 768 }}>
        <>
          {foodChoices?.map((fc) => (
            <ImageListItem key={fc.image}>
              <ListItemButton
                onClick={() => handleFoodChoice(fc)}
                sx={{
                  padding: 0,
                  margin: 0,
                  width: "100%",
                  height: "auto",
                }}
              >
                <img
                  src={fc.image}
                  alt={fc.name}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </ListItemButton>
              <ImageListItemBar title={fc.name} />
            </ImageListItem>
          ))}
        </>
      </ImageList>
    </Screen>
  );
};
