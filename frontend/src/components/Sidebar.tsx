import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography as Text,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useAppState } from "../providers/AppProvider";
import { Box } from "@mui/system";
import { Logo } from "./Logo";

export const Sidebar = () => {
  const { closeSidebar, isSidebarOpen } = useAppState();
  return (
    <Drawer anchor="left" open={isSidebarOpen} onClose={closeSidebar}>
      <Box role="sidebar" style={{ width: 250 }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            gap: 8,
          }}
        >
          <Logo />
          <Text variant="h6" sx={{ flexGrow: 1 }}>
            Food Run
          </Text>
        </Box>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircle fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
