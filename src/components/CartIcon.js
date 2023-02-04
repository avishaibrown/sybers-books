import { IconButton } from "@mui/material";
import { ShoppingCart, RemoveShoppingCart } from "@mui/icons-material";
import Button from "./Button";
import { SHOP } from "../utils/constants";

const CartIcon = (props) => {
  const { addToCart, onClickHandler, book, isIcon } = props;

  return addToCart ? (
    <IconButton
      onClick={() => onClickHandler(book, "add")}
      aria-label={SHOP.modalButtons.add}
      sx={{ marginLeft: "auto" }}
    >
      {isIcon ? (
        <ShoppingCart sx={{ transform: "scale(1.5)" }} />
      ) : (
        <Button variant="contained" endIcon={<ShoppingCart />}>
          {SHOP.modalButtons.add}
        </Button>
      )}
    </IconButton>
  ) : (
    <IconButton
      onClick={() => onClickHandler(book, "remove")}
      aria-label={SHOP.modalButtons.remove}
      sx={{ marginLeft: "auto" }}
    >
      {isIcon ? (
        <RemoveShoppingCart sx={{ transform: "scale(1.5)" }} />
      ) : (
        <Button
          variant="contained"
          color="error"
          endIcon={<RemoveShoppingCart />}
        >
          {SHOP.modalButtons.remove}
        </Button>
      )}
    </IconButton>
  );
};

export default CartIcon;
