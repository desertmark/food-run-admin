import { CircularProgress, Typography as Text } from "@mui/material";
import { Screen } from "./Screen";

export const Loader = () => {
  return (
    <Screen style={{ justifyContent: "center", alignItems: "center", gap: 16 }}>
      <CircularProgress color="primary" size={100} />
      <Text color="primary">Loading...</Text>
    </Screen>
  );
};
