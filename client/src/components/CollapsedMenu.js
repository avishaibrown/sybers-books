import React, { useState } from "react";
import StyledBadge from "./StyledBadge";
import { Box, IconButton } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useTheme, alpha } from "@mui/material/styles";
import Drawer from "./Drawer";

const CollapsedMenu = (props) => {
  const { menuItems, cartItems } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          edge="end"
          aria-label="open navigation menu"
          onClick={() => setOpen(true)}
          sx={{
            p: 1.2,
            color: "primary.main",
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: "8px",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
            },
          }}
        >
          <StyledBadge
            badgeContent={cartItems}
            color="secondary"
            tight="true"
          >
            <MenuRoundedIcon fontSize="medium" />
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
