import { IconButton } from "@mui/material";
import { ShoppingCart, RemoveShoppingCart } from "@mui/icons-material";
import Button from "./Button";
import { SHOP } from "../utils/constants";
import { formatAsCurrency } from "../utils/util";

const CartButton = (props) => {
  const { addToCart, onCartAction, book, isIcon, price } = props;

  const buttonToRender =
    addToCart && isIcon ? (
      <IconButton
        onClick={() => onCartAction(book, "add")}
        aria-label={SHOP.modalButtons.add}
        sx={{ marginLeft: "auto" }}
      >
        <ShoppingCart sx={{ transform: "scale(1.5)" }} />
      </IconButton>
    ) : addToCart && !isIcon ? (
      <Button
        onClick={() => onCartAction(book, "add")}
        aria-label={SHOP.modalButtons.add}
        variant="contained"
        endIcon={<ShoppingCart />}
      >
        {SHOP.modalButtons.add}
        {" ("}
        {price && formatAsCurrency(price)}
        {") "}
      </Button>
    ) : !addToCart && isIcon ? (
      <IconButton
        onClick={() => onCartAction(book, "remove")}
        aria-label={SHOP.modalButtons.remove}
        sx={{ marginLeft: "auto" }}
      >
        <RemoveShoppingCart sx={{ transform: "scale(1.5)" }} />
      </IconButton>
    ) : (
      <Button
        onClick={() => onCartAction(book, "remove")}
        aria-label={SHOP.modalButtons.remove}
        variant="contained"
        color="error"
        endIcon={<RemoveShoppingCart />}
      >
        {SHOP.modalButtons.remove}
        {" ("}
        {price && formatAsCurrency(price)}
        {") "}
      </Button>
    );

  return buttonToRender;
};

export default CartButton;
