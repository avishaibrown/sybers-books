import { useState } from "react";
import { Box, Menu, MenuItem, IconButton } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const CollapsedMenu = (props) => {
  const { menuItems } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (link) => {
    window.location.href = link;
  };

  return (
    <>
      <Box sx={{ display: "flex", ml: "auto" }}>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ ml: "auto" }}
          onClick={handleOpen}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <MenuRoundedIcon fontSize="large" />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.title}
            onClick={() => handleMenuItemClick(item.link)}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default CollapsedMenu;
