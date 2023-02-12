import { useState, useEffect } from "react";
import {
  Alert,
  IconButton,
  Container,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Grid,
  Link,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Snackbar,
} from "@mui/material";
import { Delete, Close } from "@mui/icons-material";
import Typography from "../components/Typography";
import GooglePay from "../components/GooglePayButton";
import {
  SHIPPING_ADDRESS_UNSERVICEABLE_REASON,
  SHIPPING_OPTIONS,
  CART,
  UNSERVICEABLE_SHIPPING_COUNTRIES,
  SHOP,
} from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  addToCart,
  cartActionStart,
  cartActionSuccess,
  cartActionFailure,
  updateShippingCost,
} from "../slices/cart";
import CurrencyFormat from "react-currency-format";
import { truncateString } from "../utils/util";
import BookModal from "../components/BookModal";

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  const bookAddedToCart = useSelector((state) => state.cart.bookAddedToCart);
  const bookRemovedFromCart = useSelector(
    (state) => state.cart.bookRemovedFromCart
  );
  const subtotal = useSelector((state) => state.cart.subtotal);
  const shipping = useSelector((state) => state.cart.shipping);
  const total = useSelector((state) => state.cart.total);
  const [cancelled, setCancelled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [bookToDisplay, setBookToDisplay] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [cartActionMessage, setCartActionMessage] = useState("");

  useEffect(() => {
    if (!!bookAddedToCart) {
      setCartActionMessage(bookAddedToCart + SHOP.addedToCartMessage);
      setOpenSnackbar(true);
    } else if (bookRemovedFromCart) {
      setCartActionMessage(bookRemovedFromCart + SHOP.removedFromCartMessage);
      setOpenSnackbar(true);
    }
  }, [bookAddedToCart, bookRemovedFromCart]); // eslint-disable-line react-hooks/exhaustive-deps

  const onCancelTransaction = () => {
    setCancelled(true);
  };

  const onClickHandler = (book, action) => {
    setOpenModal(false);
    setOpenSnackbar(false);
    dispatch(cartActionStart());
    try {
      if (action === "add") {
        dispatch(addToCart(book));
      } else if (action === "remove") {
        dispatch(removeFromCart(book));
      }
      dispatch(cartActionSuccess({ book, action }));
    } catch (error) {
      dispatch(cartActionFailure(error.message));
    }
  };

  const onShippingChange = (event) => {
    dispatch(updateShippingCost(Number(event.target.value)));
  };

  const onBookClick = (book) => {
    setBookToDisplay(book);
    setOpenModal(true);
  };

  const onCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container
      component="section"
      sx={{
        mt: { xs: 15, md: 20 },
        mb: { md: 10 },
        alignItems: "center",
        textAlign: "center",
      }}
      disableGutters
      maxWidth={false}
    >
      <Typography
        variant="h2"
        gutterBottom
        marked="center"
        sx={{ fontSize: { xs: "3rem", md: "3.75rem" }, mb: 10 }}
      >
        {CART.title}
      </Typography>
      {cancelled && (
        <Alert
          onClose={() => setCancelled(false)}
          severity="info"
          variant="filled"
        >
          {CART.transactionCancelled}
        </Alert>
      )}
      {cart.length > 0 && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={5}
        >
          <Grid item xs={12} md={10}>
            <TableContainer component={Paper}>
              <Table
                sx={{
                  width: { xs: 500, sm: 600, md: 800, lg: 1000, xl: 1400 },
                }}
                aria-label="shopping cart books table"
              >
                <TableHead>
                  <TableRow>
                    {CART.columnHeaders.map((item, index) => (
                      <TableCell
                        key={"cart-table-header-" + index}
                        sx={{
                          fontWeight: "bold",
                          fontSize: { xs: "1.25rem", md: "1.5rem" },
                        }}
                      >
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map((book, index) => (
                    <TableRow key={"cart-book-" + index}>
                      <TableCell align="center" padding="none">
                        <IconButton
                          aria-label="delete"
                          onClick={() => onClickHandler(book, "remove")}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Box maxWidth={{ xs: 400, sm: 600, md: "none" }}>
                          <Link
                            variant="h5"
                            href="#"
                            onClick={() => onBookClick(book)}
                            sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}
                          >
                            {book.title1
                              ? truncateString(book.title1, 80, true)
                              : SHOP.missingValuesText.title}
                          </Link>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                          >
                            {" "}
                            {book.authorSn
                              ? truncateString(book.authorSn, 50, true)
                              : SHOP.missingValuesText.author}
                          </Typography>
                        </Box>
                        {openModal && (
                          <BookModal
                            open={openModal}
                            setOpen={setOpenModal}
                            book={bookToDisplay}
                            onClickHandler={onClickHandler}
                            addToCart={cart.every(
                              (obj) => obj.Serial !== book.Serial
                            )}
                            missingValuesText={SHOP.missingValuesText}
                            modalTabs={SHOP.modalTabs}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <CurrencyFormat
                          value={book.price1}
                          displayType={"text"}
                          prefix={"$"}
                          suffix={" AUD"}
                          thousandSeparator={true}
                          decimalScale={2}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={1} />
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      {CART.subtotal}
                    </TableCell>
                    <TableCell align="left">
                      <CurrencyFormat
                        value={subtotal}
                        displayType={"text"}
                        prefix={"$"}
                        suffix={" AUD"}
                        thousandSeparator={true}
                        decimalScale={2}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={10} alignItems="flex-end">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: { xs: 300, sm: 500 } }}
                aria-label="shopping cart totals table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
                    >
                      {CART.cartTotals}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {CART.subtotal}
                    </TableCell>
                    <TableCell>
                      <CurrencyFormat
                        value={subtotal}
                        displayType={"text"}
                        prefix={"$"}
                        suffix={" AUD"}
                        thousandSeparator={true}
                        decimalScale={2}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {CART.shipping}
                    </TableCell>
                    <TableCell>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="shipping-cost-radio-group"
                          name="shipping-cost-radio-group"
                          value={shipping}
                          onChange={onShippingChange}
                        >
                          {CART.shippingCostOptions.map((item, index) => (
                            <FormControlLabel
                              key={"shipping-cost-radio-button-" + index}
                              value={item.value}
                              control={<Radio />}
                              label={item.label}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {CART.total}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", fontSize: "1.125rem" }}
                    >
                      <CurrencyFormat
                        value={total}
                        displayType={"text"}
                        prefix={"$"}
                        suffix={" AUD"}
                        thousandSeparator={true}
                        decimalScale={2}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box m={5}>
              <GooglePay
                amount={total}
                onCancelHandler={onCancelTransaction}
                shippingOptions={SHIPPING_OPTIONS}
                unserviceableCountries={UNSERVICEABLE_SHIPPING_COUNTRIES}
                unserviceableReason={SHIPPING_ADDRESS_UNSERVICEABLE_REASON}
              ></GooglePay>
            </Box>
          </Grid>
        </Grid>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar}
        onClose={onCloseSnackbar}
        autoHideDuration={6000}
        sx={{ height: 100 }}
        message={cartActionMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onCloseSnackbar}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Container>
  );
};

export default Cart;
