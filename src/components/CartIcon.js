import { IconButton } from "@mui/material";
import { ShoppingCart, RemoveShoppingCart } from "@mui/icons-material";
import Button from "./Button";
import { SHOP } from "../utils/constants";

const CartIcon = (props) => {
  const { addToCart, onClickHandler, book, isIcon, price } = props;

  const buttonToRender =
    addToCart && isIcon ? (
      <IconButton
        onClick={() => onClickHandler(book, "add")}
        aria-label={SHOP.modalButtons.add}
        sx={{ marginLeft: "auto" }}
      >
        <ShoppingCart sx={{ transform: "scale(1.5)" }} />
      </IconButton>
    ) : addToCart && !isIcon ? (
      <Button
        onClick={() => onClickHandler(book, "add")}
        aria-label={SHOP.modalButtons.add}
        variant="contained"
        endIcon={<ShoppingCart />}
      >
        {SHOP.modalButtons.add} {price && `( $${price} AUD )`}
      </Button>
    ) : !addToCart && isIcon ? (
      <IconButton
        onClick={() => onClickHandler(book, "remove")}
        aria-label={SHOP.modalButtons.remove}
        sx={{ marginLeft: "auto" }}
      >
        <RemoveShoppingCart sx={{ transform: "scale(1.5)" }} />
      </IconButton>
    ) : (
      <Button
        onClick={() => onClickHandler(book, "remove")}
        aria-label={SHOP.modalButtons.remove}
        variant="contained"
        color="error"
        endIcon={<RemoveShoppingCart />}
      >
        {SHOP.modalButtons.remove} {price && `( $${price} AUD )`}
      </Button>
    );

  return buttonToRender;
};

export default CartIcon;
