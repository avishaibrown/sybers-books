import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ tight }) => ({
  "& .MuiBadge-badge": {
    right: tight === "true" ? -3 : -15,
    top: tight === "true" ? 13 : 16,
    border: `2px solid`,
    padding: "0 4px",
    fontFamily: "auto",
    backgroundColor: "#40826D"
  },
}));

export default StyledBadge;
