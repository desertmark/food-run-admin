import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography as Text,
} from "@mui/material";
import { FC } from "react";

export interface UserItemProps {
  user: {
    displayName: string;
    email: string;
  };
  isAdmin?: boolean;
}

export const UserItem: FC<UserItemProps> = ({ user, isAdmin }) => {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Avatar />
          <Box
            flex={1}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text variant="h6">{user.displayName}</Text>
              {isAdmin && <Chip label="admin" size="small" color="info" />}
            </Box>
            <Text variant="caption" color="primary">
              {user.email}
            </Text>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
