import { CircularProgress, Typography as Text, useTheme } from "@mui/material";
import { Screen } from "./Screen";

export const Loader = () => {
  const { spacing } = useTheme();
  return (
    <Screen
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: spacing(2),
      }}
    >
      <CircularProgress color="primary" size={100} />
      <Text color="primary">Loading...</Text>
    </Screen>
  );
};
