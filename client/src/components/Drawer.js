import React from "react";
import {
  SwipeableDrawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useTheme, alpha } from "@mui/material/styles";
import { CART } from "../utils/constants";
import StyledBadge from "./StyledBadge";

const Drawer = (props) => {
  const { menuItems, open, setOpen, cartItems } = props;
  const location = useLocation();
  const theme = useTheme();

  const toggleDrawer = (newOpen) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(newOpen);
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      PaperProps={{
        sx: {
          width: { xs: 290, sm: 340 },
          backgroundColor: "#FAF7F2",
          backgroundImage: "none",
          display: "flex",
          flexDirection: "column",
          p: 0,
        },
      }}
    >
      {/* Drawer Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2.5,
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "primary.main",
          }}
        >
          Menu
        </Typography>
        <IconButton
          onClick={toggleDrawer(false)}
          size="small"
          aria-label="close navigation menu"
          sx={{
            color: "text.secondary",
            "&:hover": { color: "primary.main" },
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Navigation List */}
      <List sx={{ px: 2, py: 2, flex: 1 }}>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.link;
          const isCart = item.title === CART.title || item.title === "Cart";

          return (
            <ListItemButton
              key={"drawer-list-item-" + index}
              component={RouterLink}
              to={item.link}
              onClick={toggleDrawer(false)}
              sx={{
                borderRadius: "8px",
                mb: 1,
                py: 1.4,
                px: 2,
                backgroundColor: isActive
                  ? alpha(theme.palette.primary.main, 0.09)
                  : "transparent",
                color: isActive ? "primary.main" : "text.primary",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.06),
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "primary.main" : "text.secondary",
                  minWidth: 38,
                }}
              >
                {isCart ? (
                  <StyledBadge
                    badgeContent={cartItems}
                    color="secondary"
                    tight="true"
                  >
                    <ShoppingBagOutlinedIcon fontSize="small" />
                  </StyledBadge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: "1rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "primary.main" : "text.primary",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.08) }} />

      {/* Drawer Footer Info */}
      <Box sx={{ p: 3, backgroundColor: alpha(theme.palette.primary.main, 0.02) }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.82rem" }}>
          Syber's Books • Rare & Collectible
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
          Caulfield South, Melbourne
        </Typography>
      </Box>
    </SwipeableDrawer>
  );
};

export default Drawer;
