import { Box, Button, Typography as Text } from "@mui/material";
import { FC } from "react";
import { Screen } from "../components/Screen";
import { useFirebase } from "../providers/FirebaseProvider";

export const UnauthorizedScreen: FC = () => {
  const { logout } = useFirebase();
  return (
    <Screen role="home" sx={{ justifyContent: "center" }}>
      <Box
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ gap: 1 }}
      >
        <Text variant="h1">401</Text>
        <Text variant="h3">Unaunthorized</Text>
        <Button onClick={logout} sx={{ marginTop: 3 }} variant="contained">
          Logout
        </Button>
      </Box>
    </Screen>
  );
};
