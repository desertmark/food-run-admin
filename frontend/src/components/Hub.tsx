import { Divider, Drawer, Typography as Text, useTheme } from "@mui/material";
import { AccountCircle, CalendarMonth, Fastfood } from "@mui/icons-material";
import { useAppState } from "../providers/AppProvider";
import { Box } from "@mui/system";
import { List } from "./List";

export const Hub = () => {
  const { closeHub, isHubOpen, hubTemplate } = useAppState();

  return (
    <Drawer
      anchor="bottom"
      open={isHubOpen}
      onClose={closeHub}
      PaperProps={{ sx: { borderRadius: 4 } }}
    >
      <Box
        role="hub"
        display="flex"
        flexDirection="column"
        padding={2}
        sx={{ gap: 2 }}
        height="80vh"
      >
        {hubTemplate}
      </Box>
    </Drawer>
  );
};
