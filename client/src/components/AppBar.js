import React from "react";
import {
  Toolbar,
  Box,
  Stack,
  AppBar as MuiAppBar,
  IconButton,
  useMediaQuery,
  Button as MuiNavButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import CollapsedMenu from "./CollapsedMenu";
import StyledBadge from "./StyledBadge";
import { CART } from "../utils/constants";

const AppBar = (props) => {
  const { title, image, menuItems, navigateTo, cartItems } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <MuiAppBar
      position="sticky"
      sx={{
        backgroundColor: "rgba(241, 216, 166, 0.92)", // Rich, warm golden-parchment tone (bolder character)
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid rgba(24, 65, 50, 0.12)`,
        color: "text.primary",
        zIndex: theme.zIndex.appBar,
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, sm: 3, md: 5 },
          py: 0.8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: { xs: 60, md: 70 }, // Sleek, modern compact navbar height
        }}
      >
        {/* Brand / Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            transition: "opacity 0.2s ease, transform 0.2s ease",
            "&:hover": {
              opacity: 0.9,
              transform: "scale(1.01)",
            },
          }}
          onClick={() => navigate(navigateTo)}
        >
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              maxHeight: { xs: 32, sm: 36, md: 42 }, // Tastefully scaled down logo
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Navigation Area */}
        {isMobileOrTablet ? (
          <CollapsedMenu menuItems={menuItems} cartItems={cartItems} />
        ) : (
          <Stack direction="row" spacing={1.5} alignItems="center">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.link;

              if (item.title === CART.title || item.title === "Cart") {
                return (
                  <IconButton
                    key={item.title}
                    component={RouterLink}
                    to={item.link}
                    aria-label="View shopping cart"
                    sx={{
                      ml: 1,
                      p: 1.1,
                      color: isActive ? "primary.main" : "#181B18",
                      backgroundColor: isActive
                        ? "rgba(24, 65, 50, 0.12)"
                        : "rgba(24, 65, 50, 0.05)",
                      border: `1px solid ${
                        isActive ? "rgba(24, 65, 50, 0.4)" : "rgba(24, 65, 50, 0.12)"
                      }`,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "rgba(24, 65, 50, 0.14)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <StyledBadge
                      badgeContent={cartItems}
                      color="secondary"
                      tight="true"
                    >
                      <ShoppingBagOutlinedIcon fontSize="medium" />
                    </StyledBadge>
                  </IconButton>
                );
              }

              return (
                <MuiNavButton
                  key={item.title}
                  component={RouterLink}
                  to={item.link}
                  startIcon={item.showIconInAppBar ? item.icon : null}
                  sx={{
                    px: 2,
                    py: 0.8,
                    fontSize: "0.95rem",
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? "primary.main" : "#181B18",
                    backgroundColor: isActive
                      ? "rgba(24, 65, 50, 0.08)"
                      : "transparent",
                    borderRadius: "6px",
                    position: "relative",
                    letterSpacing: "0.01em",
                    "&:hover": {
                      backgroundColor: "rgba(24, 65, 50, 0.1)",
                      color: "primary.main",
                    },
                    "&::after": isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: 4,
                          left: "20%",
                          width: "60%",
                          height: "2.5px",
                          backgroundColor: theme.palette.secondary.main,
                          borderRadius: "2px",
                        }
                      : {},
                  }}
                >
                  {item.title}
                </MuiNavButton>
              );
            })}
          </Stack>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
