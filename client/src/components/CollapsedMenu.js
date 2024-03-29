import { useState } from "react";
import StyledBadge from "./StyledBadge";
import { Box, IconButton } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Drawer from "./Drawer";

const CollapsedMenu = (props) => {
  const { menuItems, cartItems } = props;
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Box sx={{ display: "flex", ml: "auto", mr: 2 }}>
        <IconButton
          edge="end"
          color="#40826D"
          aria-label="menu"
          sx={{ ml: "auto", transform: "scale(1.2)" }}
          onClick={onClick}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <StyledBadge
            badgeContent={cartItems}
            color="secondary"
            tight={"true"}
          >
            <MenuRoundedIcon fontSize="large" />
          </StyledBadge>
        </IconButton>
      </Box>
      <Drawer
        menuItems={menuItems}
        open={open}
        setOpen={setOpen}
        cartItems={cartItems}
      />
    </>
  );
};

export default CollapsedMenu;
