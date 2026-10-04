import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme, tight }) => ({
  "& .MuiBadge-badge": {
    right: tight === "true" ? 2 : -8,
    top: tight === "true" ? 4 : 8,
    border: `2px solid ${theme.palette.background.default}`,
    padding: "0 5px",
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontWeight: 700,
    fontSize: "0.72rem",
    minWidth: "18px",
    height: "18px",
    borderRadius: "9px",
    backgroundColor: theme.palette.secondary.main,
    color: "#FFFFFF",
    boxShadow: "0 2px 6px rgba(179, 107, 57, 0.35)",
  },
}));

export default StyledBadge;
