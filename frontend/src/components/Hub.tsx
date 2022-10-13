import { Divider, Drawer, Typography as Text, useTheme } from "@mui/material";
import { AccountCircle, CalendarMonth, Fastfood } from "@mui/icons-material";
import { useAppState } from "../providers/AppProvider";
import { Box } from "@mui/system";
import { List } from "./List";

export const Hub = () => {
  const { closeHub, isHubOpen, hubTemplate } = useAppState();

  return (
    <Drawer anchor="bottom" open={isHubOpen} onClose={closeHub}>
      <Box role="hub">{hubTemplate}</Box>
    </Drawer>
  );
};
