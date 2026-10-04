import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";

const ButtonRoot = styled(MuiButton)(({ theme, size, variant = "contained" }) => ({
  borderRadius: 8,
  fontWeight: 600,
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  textTransform: "none",
  letterSpacing: "0.01em",
  padding: theme.spacing(1.2, 3.2),
  fontSize: theme.typography.pxToRem(15),
  transition: "all 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
  ...(variant === "contained" && {
    backgroundColor: theme.palette.primary.main,
    color: "#FFFFFF",
    boxShadow: "0 2px 8px rgba(28, 53, 45, 0.15)",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      boxShadow: "0 6px 18px rgba(28, 53, 45, 0.25)",
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  }),
  ...(size === "small" && {
    padding: theme.spacing(0.8, 2.2),
    fontSize: theme.typography.pxToRem(13),
  }),
  ...(size === "large" && {
    padding: theme.spacing(1.6, 4.2),
    fontSize: theme.typography.pxToRem(16),
  }),
}));

function Button(props) {
  return <ButtonRoot {...props} />;
}

export default Button;
