import { ElectricBolt } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

export const Logo = styled(ElectricBolt)(({ theme }) => {
  return {
    fontSize: theme.typography.h3.fontSize,
    transitionDuration: theme.transitions.duration.shortest.toString(),
    transitionProperty: "all",
    ":hover": {
      color: "#fcd303",
    },
  };
});
