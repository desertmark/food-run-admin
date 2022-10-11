import { Divider, Drawer, Typography as Text, useTheme } from "@mui/material";
import { AccountCircle, CalendarMonth, Fastfood } from "@mui/icons-material";
import { useAppState } from "../providers/AppProvider";
import { Box } from "@mui/system";
import { Logo } from "./Logo";
import { List } from "./List";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const { closeSidebar, isSidebarOpen } = useAppState();
  const navigate = useNavigate();

  const handleItemclick = (path: string) => () => {
    navigate(path);
    closeSidebar();
  };
  const { spacing } = useTheme();
  return (
    <Drawer anchor="left" open={isSidebarOpen} onClose={closeSidebar}>
      <Box role="sidebar" style={{ width: 250 }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: spacing(2),
            gap: spacing(2),
          }}
        >
          <Logo />
          <Text variant="h6" sx={{ flexGrow: 1 }}>
            Food Run
          </Text>
        </Box>
        <Divider />
        <List
          items={[
            {
              icon: <Fastfood />,
              text: "Orders",
              onClick: handleItemclick("/"),
            },
            {
              icon: <AccountCircle />,
              text: "Users",
              onClick: handleItemclick("/users"),
            },
            {
              icon: <CalendarMonth />,
              text: "Schedule",
              onClick: handleItemclick("/schedule"),
            },
          ]}
        />
      </Box>
    </Drawer>
  );
};
