import {
  List as MuiList,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FC } from "react";

export interface ListProps {
  items: ListItem[];
}

export interface ListItem {
  icon?: JSX.Element;
  text: string;
  onClick?: () => void;
}

export const List: FC<ListProps> = ({ items }) => {
  return (
    <MuiList>
      {items?.map(({ icon, text, onClick }, index) => (
        <ListItem disablePadding key={`list-item-${index}`} onClick={onClick}>
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </MuiList>
  );
};
