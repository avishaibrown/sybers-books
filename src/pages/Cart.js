import { useState } from "react";
import {
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Container,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import GooglePay from "../components/GooglePayButton";
import {
  SHIPPING_ADDRESS_UNSERVICEABLE_REASON,
  SHIPPING_OPTIONS,
  TRANSACTION_CANCELLED,
  UNSERVICEABLE_SHIPPING_COUNTRIES,
} from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../slices/cart";

const Cart = () => {
  const [cancelled, setCancelled] = useState(false);

  const onCancelHandler = () => {
    setCancelled(true);
  };

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const onClickHandler = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <Container
      component="section"
      sx={{
        mt: { xs: 20, md: 25 },
        mb: 10,
        alignItems: "center",
      }}
      maxWidth={false}
    >
      {cancelled && (
        <Alert
          onClose={() => setCancelled(false)}
          severity="info"
          variant="filled"
        >
          {TRANSACTION_CANCELLED}
        </Alert>
      )}
      {cart.length > 0 && (
        <List>
          {cart.map((item, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onClickHandler(item)}
                >
                  <Delete />
                </IconButton>
              }
            >
              <ListItemText primary={item.title1} secondary={item.authorSn} />
            </ListItem>
          ))}
        </List>
      )}
      <GooglePay
        amount={"100"}
        onCancelHandler={onCancelHandler}
        shippingOptions={SHIPPING_OPTIONS}
        unserviceableCountries={UNSERVICEABLE_SHIPPING_COUNTRIES}
        unserviceableReason={SHIPPING_ADDRESS_UNSERVICEABLE_REASON}
      ></GooglePay>
    </Container>
  );
};

export default Cart;
