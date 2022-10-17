import { Box, Button, Divider, Typography as Text } from "@mui/material";
import { FC, useEffect } from "react";
import { Screen } from "../../../components/Screen";
import { IUser, UserItem } from "../../../components/UserItem";
import { useAppState } from "../../../providers/AppProvider";
import { useBackend } from "../../../providers/BackendProvider";

export const UsersScreen: FC = () => {
  const { users, loadUsers, updateUser } = useBackend();
  const { openHub, closeHub } = useAppState();
  const handleUpdate = (user: IUser, role: string, msg: string) => {
    openHub(
      <Box
        display="flex"
        flexDirection="column"
        padding={2}
        sx={{ gap: 2 }}
        height="50vh"
      >
        <Text color="primary" textAlign="center">
          {msg}
        </Text>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            await updateUser({ uid: user.uid, role });
            await loadUsers();
            closeHub();
          }}
        >
          Yes
        </Button>
        <Button variant="outlined" onClick={() => closeHub()}>
          Cancel
        </Button>
      </Box>
    );
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <Screen role="users" sx={{ gap: 2 }}>
      <Text variant="h5">List of users</Text>
      <Divider />
      {users?.map((u: any, index: number) => (
        <UserItem
          user={u}
          key={`user-item-${index}`}
          isAdmin={u?.customClaims?.role === "admin"}
          onPromote={() =>
            handleUpdate(
              u,
              "admin",
              "You are about to make this user an Admin, do you want to continue?"
            )
          }
          onRevoke={() =>
            handleUpdate(
              u,
              "",
              "You are about to revoke this user from the Admins, do you want to continue?"
            )
          }
        />
      ))}
    </Screen>
  );
};
