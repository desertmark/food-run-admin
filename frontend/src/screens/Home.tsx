import { Box, Button, Typography as Text } from "@mui/material";
import { FC } from "react";
import { Logo } from "../components/Logo";
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
        <Logo sx={{ fontSize: 100 }} />
        <Text variant="h5">Don't Have the app yet?</Text>
        <Text variant="h6">Download Food Run right now!</Text>
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
