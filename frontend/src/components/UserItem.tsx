import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography as Text,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import { stringAvatar } from "../utils/string-avatar";
export interface IUser {
  uid: string;
  displayName: string;
  email: string;
}
export interface UserItemProps {
  user: IUser;
  isAdmin?: boolean;
  onPromote?: (user: IUser) => void;
  onRevoke?: (user: IUser) => void;
}

export const UserItem: FC<UserItemProps> = ({
  user,
  isAdmin,
  onPromote,
  onRevoke,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { spacing } = useTheme();
  return (
    <Card onClick={() => setIsOpen(!isOpen)}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Avatar {...stringAvatar(user.displayName, spacing(6))} />
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
              {isAdmin && <Chip label="Admin" size="small" color="info" />}
            </Box>
            <Box display="flex" flexDirection="column" sx={{ gap: 2 }}>
              <Text variant="caption" color="primary">
                {user.email}
              </Text>
              {!isAdmin && isOpen && (
                <Button
                  variant="outlined"
                  size="small"
                  color="warning"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPromote!(user);
                  }}
                >
                  Make admin
                </Button>
              )}

              {isAdmin && isOpen && (
                <Button
                  variant="outlined"
                  size="small"
                  color="warning"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRevoke!(user);
                  }}
                >
                  Revoke admin
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
