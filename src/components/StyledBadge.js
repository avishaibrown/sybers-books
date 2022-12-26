import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ tight }) => ({
  "& .MuiBadge-badge": {
    right: tight ? -3 : -15,
    top: tight ? 13 : 16,
    border: `2px solid`,
    padding: "0 4px",
    fontFamily: "auto",
  },
}));

export default StyledBadge;
