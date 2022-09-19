import { styled } from "@mui/material/styles";

export const Screen = styled("main")(({ theme }) => {
  return {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.spacing(2),
  };
});
