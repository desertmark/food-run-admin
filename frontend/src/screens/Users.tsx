import { Divider, Typography as Text } from "@mui/material";
import { FC, useEffect } from "react";
import { Screen } from "../components/Screen";
import { UserItem } from "../components/UserItem";
import { useBackend } from "../providers/BackendProvider";

export const UsersScreen: FC = () => {
  const { users, loadUsers } = useBackend();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);
  return (
    <Screen role="users" sx={{ gap: 2 }}>
      <Text variant="h5">List of users</Text>
      <Divider />
      {users?.map((u: any, index: number) => (
        <UserItem user={u} key={`user-item-${index}`} />
      ))}
    </Screen>
  );
};
