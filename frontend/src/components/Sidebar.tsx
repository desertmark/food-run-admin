import {
  Divider,
  Drawer,
  Paper,
  Typography as Text,
  useTheme,
} from "@mui/material";
import {
  AccountCircle,
  CalendarMonth,
  Fastfood,
  Home,
  Settings,
} from "@mui/icons-material";
import { useAppState } from "../providers/AppProvider";
import { Box } from "@mui/system";
import { FoodRunLogo, Logo } from "./Logo";
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
            flexDirection: "column",
            alignItems: "start",
            padding: spacing(2),
            gap: spacing(2),
          }}
        >
          <FoodRunLogo
            style={{ width: 135, height: 90, objectFit: "cover" }}
            secondary
          />
          <Text
            variant="logo"
            sx={{ flexGrow: 1, width: "100%", textAlign: "right" }}
            color="primary"
          >
            Your food orgnized
          </Text>
        </Box>
        <Divider />

        <List
          items={[
            {
              icon: <Home color="primary" />,
              text: "Home",
              onClick: handleItemclick("/"),
            },
            {
              icon: <Fastfood color="primary" />,
              text: "Place my order",
              onClick: handleItemclick("/orders"),
            },
          ]}
        />
        <Box
          p={spacing(2)}
          mt={spacing(3)}
          alignItems="center"
          display="flex"
          sx={{ gap: spacing(2) }}
        >
          <Settings color="primary" />
          <Text variant="logo" color="primary">
            Admin
          </Text>
        </Box>
        <Divider />

        <List
          items={[
            {
              icon: <Fastfood color="primary" />,
              text: "Orders",
              onClick: handleItemclick("/admin"),
            },
            {
              icon: <AccountCircle color="primary" />,
              text: "Users",
              onClick: handleItemclick("/admin/users"),
            },
            {
              icon: <CalendarMonth color="primary" />,
              text: "Schedule",
              onClick: handleItemclick("/admin/schedule"),
            },
          ]}
        />
      </Box>
    </Drawer>
  );
};
