import { Box, Button, Typography as Text } from "@mui/material";
import { FC } from "react";
import { FoodRunLogo, Logo } from "../components/Logo";
import { Screen } from "../components/Screen";
import { useBackend } from "../providers/BackendProvider";

export const HomeScreen: FC = () => {
  const { config } = useBackend();
  return (
    <Screen role="home" sx={{ justifyContent: "center" }}>
      <Box
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ gap: 1 }}
      >
        <FoodRunLogo style={{ width: "75%", maxWidth: 500 }} secondary />
        <Text
          variant="logo"
          color="primary"
          fontSize={28}
          sx={{ marginBottom: 3 }}
        >
          Your food organized
        </Text>
        <Text variant="logo" color="primary">
          Don't Have the app yet?
        </Text>
        <Text variant="logo" color="primary">
          Download Food Run right now!
        </Text>
        <Button
          href={config.androidDownloadUrl}
          sx={{ marginTop: 3 }}
          variant="contained"
        >
          Download
        </Button>
      </Box>
    </Screen>
  );
};
