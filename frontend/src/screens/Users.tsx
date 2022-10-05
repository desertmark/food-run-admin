import { FC, useEffect } from "react";
import { Screen } from "../components/Screen";
import { useBackend } from "../providers/BackendProvider";

export const UsersScreen: FC = () => {
  const { users, loadUsers } = useBackend();

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);
  return (
    <Screen role="users" sx={{ justifyContent: "center" }}>
      {JSON.stringify(users)}
    </Screen>
  );
};
