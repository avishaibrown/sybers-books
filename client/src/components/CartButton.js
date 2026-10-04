import React from "react";
import { IconButton, Button as MuiButton, Tooltip } from "@mui/material";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useTheme, alpha } from "@mui/material/styles";
import { formatAsCurrency } from "../utils/util";

const CartButton = (props) => {
  const { addToCart, onCartAction, book, isIcon, price } = props;
  const theme = useTheme();

  if (isIcon) {
    if (addToCart) {
      return (
        <Tooltip title="Add to Cart" arrow>
          <IconButton
            onClick={() => onCartAction(book, "add")}
            aria-label="Add to cart"
            sx={{
              backgroundColor: alpha(theme.palette.primary.main, 0.06),
              color: "primary.main",
              borderRadius: "10px",
              p: 1.1,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "#FFFFFF",
                transform: "scale(1.06)",
              },
            }}
          >
            <AddShoppingCartRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title="In Cart (Click to Remove)" arrow>
          <IconButton
            onClick={() => onCartAction(book, "remove")}
            aria-label="Remove from cart"
            sx={{
              backgroundColor: alpha(theme.palette.secondary.main, 0.12),
              color: "secondary.main",
              borderRadius: "10px",
              p: 1.1,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#e53935",
                color: "#FFFFFF",
                transform: "scale(1.06)",
              },
            }}
          >
            <RemoveShoppingCartRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      );
    }
  }

  // Full Button variant (e.g. inside Modal)
  if (addToCart) {
    return (
      <MuiButton
        variant="contained"
        onClick={() => onCartAction(book, "add")}
        startIcon={<AddShoppingCartRoundedIcon />}
        sx={{
          backgroundColor: "primary.main",
          color: "#FFFFFF",
          px: 3.5,
          py: 1.2,
          fontWeight: 600,
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "primary.light",
          },
        }}
      >
        Add to Cart {price ? `• ${formatAsCurrency(price)}` : ""}
      </MuiButton>
    );
  }

  return (
    <MuiButton
      variant="outlined"
      onClick={() => onCartAction(book, "remove")}
      startIcon={<CheckRoundedIcon />}
      sx={{
        borderColor: "secondary.main",
        color: "secondary.main",
        px: 3.5,
        py: 1.2,
        fontWeight: 600,
        borderRadius: "10px",
        "&:hover": {
          borderColor: "#d32f2f",
          color: "#d32f2f",
          backgroundColor: alpha("#d32f2f", 0.05),
        },
      }}
    >
      In Cart (Remove) {price ? `• ${formatAsCurrency(price)}` : ""}
    </MuiButton>
  );
};

export default CartButton;
