import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import CurrencyFormat from "react-currency-format";
import {
  removeFromCart,
  addToCart,
  cartActionStart,
  cartActionSuccess,
  cartActionFailure,
  cartActionReset,
  updateShippingCost,
  markBooksAsSold,
  clearCart,
} from "../slices/cart";
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
  FormHelperText,
  RadioGroup,
  Radio,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Typography from "../components/Typography";
import GooglePay from "../components/GooglePayButton";
import BookModal from "../components/BookModal";
import InfoActionBox from "../components/InfoActionBox";
import MessageSnackbar from "../components/MessageSnackbar";
import {
  SHIPPING_ADDRESS_UNSERVICEABLE_REASON,
  SHIPPING_OPTIONS,
  CART,
  UNSERVICEABLE_SHIPPING_COUNTRIES,
  SHOP,
  ABOUT,
  PAYMENT_ROUTES,
} from "../utils/constants";
import { truncateString } from "../utils/util";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);
  const cartLoading = useSelector((state) => state.cart.cartLoading);
  const cartError = useSelector((state) => state.cart.cartError);
  const bookAddedToCart = useSelector((state) => state.cart.bookAddedToCart);
  const bookRemovedFromCart = useSelector(
    (state) => state.cart.bookRemovedFromCart
  );
  const subtotal = useSelector((state) => state.cart.subtotal);
  const shipping = useSelector((state) => state.cart.shipping);
  const shippingType = useSelector((state) => state.cart.shippingType);
  const total = useSelector((state) => state.cart.total);
  const transactionComplete = useSelector(
    (state) => state.cart.transactionComplete
  );
  const [cancelled, setCancelled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [bookToDisplay, setBookToDisplay] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [cartActionMessage, setCartActionMessage] = useState("");
  const [shippingError, setShippingError] = useState(false);
  const cancelledAlertRef = useRef(null);

  useEffect(() => {
    shipping === "0.00" ? setShippingError(true) : setShippingError(false);
  }, [shipping]);

  useEffect(() => {
    if (!!bookAddedToCart) {
      setCartActionMessage(bookAddedToCart + SHOP.addedToCartMessage);
      setOpenSnackbar(true);
    } else if (bookRemovedFromCart) {
      setCartActionMessage(bookRemovedFromCart + SHOP.removedFromCartMessage);
      setOpenSnackbar(true);
    } else if (cartError) {
      setCartActionMessage(cartError);
      setOpenSnackbar(true);
    }
  }, [bookAddedToCart, bookRemovedFromCart, cartError]);

  useEffect(() => {
    if (transactionComplete) {
      dispatch(clearCart());
      //TODO: Add logic to navigate to Success/Error based on outcome
      navigate(PAYMENT_ROUTES[1].link);
    }
  }, [transactionComplete, navigate, dispatch]);

  const onCancelTransaction = () => {
    setCancelled(true);
    window.scrollTo(0, 0);
    cancelledAlertRef.current && cancelledAlertRef.current.focus();
  };

  const onClickHandler = (book, action) => {
    dispatch(cartActionReset());
    dispatch(cartActionStart());
    setOpenModal(false);
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

  const onTransactionSuccess = async () => {
    try {
      const cartBookIds = cart.map((book) => book.Serial);
      await dispatch(markBooksAsSold(cartBookIds));
    } catch (error) {
      console.error(error);
      navigate(PAYMENT_ROUTES[1].link);
    }
  };

  return (
    <Container
      component="section"
      sx={{
        mt: cancelled ? 0 : { xs: 5, md: 10 },
        mb: { md: 10 },
        alignItems: "center",
        textAlign: "center",
      }}
      disableGutters
      maxWidth={false}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={cartLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {cancelled && (
        <Box m={3}>
          <Alert
            onClose={() => setCancelled(false)}
            severity="info"
            variant="filled"
            ref={cancelledAlertRef}
            m={5}
          >
            {CART.transactionCancelled}
          </Alert>
        </Box>
      )}
      <Typography
        variant="h2"
        gutterBottom
        marked="center"
        sx={{ fontSize: { xs: "3rem", md: "3.75rem" }, mb: 10 }}
      >
        {CART.title}
      </Typography>
      {cart.length > 0 ? (
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
                  width: { xs: 450, sm: 600, md: 800, lg: 1000, xl: 1400 },
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
                          fontSize: { xs: "1.125rem", md: "1.5rem" },
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
                            sx={{
                              fontSize: { xs: "1.125rem", md: "1.5rem" },
                              textDecoration: "none",
                              "&:hover": {
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {book.title1
                              ? truncateString(book.title1, 80, true)
                              : SHOP.missingValuesText.title}
                          </Link>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ fontSize: { xs: "0.9rem", md: "1.25rem" } }}
                          >
                            {book.authorSn
                              ? truncateString(book.authorSn, 50, true)
                              : SHOP.missingValuesText.author}
                          </Typography>
                        </Box>
                        <BookModal
                          open={openModal}
                          setOpen={setOpenModal}
                          book={bookToDisplay}
                          onClickHandler={onClickHandler}
                          loading={cartLoading}
                          addToCart={cart.every(
                            (obj) => obj.Serial !== book.Serial
                          )}
                          missingValuesText={SHOP.missingValuesText}
                          modalTabs={SHOP.modalTabs}
                        />
                      </TableCell>
                      <TableCell>
                        <CurrencyFormat
                          value={book.price1}
                          displayType={"text"}
                          prefix={"$"}
                          thousandSeparator={true}
                          decimalScale={2}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ backgroundColor: "#F6F6F6" }}>
                    <TableCell rowSpan={1} />
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      {CART.subtotal}
                    </TableCell>
                    <TableCell align="left">
                      <CurrencyFormat
                        value={subtotal}
                        displayType={"text"}
                        prefix={"$"}
                        thousandSeparator={true}
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
                <TableHead sx={{ backgroundColor: "#F6F6F6" }}>
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
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {CART.shipping}
                    </TableCell>
                    <TableCell>
                      <FormControl error={shippingError}>
                        <RadioGroup
                          aria-labelledby="shipping-cost-radio-group"
                          name="shipping-cost-radio-group"
                          value={shipping}
                          onChange={onShippingChange}
                        >
                          {SHIPPING_OPTIONS.map((item, index) => (
                            <FormControlLabel
                              key={`shipping-cost-radio-button-${index}`}
                              value={item.price}
                              control={<Radio />}
                              label={item.label}
                            />
                          ))}
                        </RadioGroup>
                        {shippingError && (
                          <FormHelperText>
                            {CART.shippingErrorText}
                          </FormHelperText>
                        )}
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
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {!shippingError && (
              <Box m={5}>
                <GooglePay
                  amount={total}
                  onCancelHandler={onCancelTransaction}
                  shippingOptions={SHIPPING_OPTIONS}
                  unserviceableCountries={UNSERVICEABLE_SHIPPING_COUNTRIES}
                  unserviceableReason={SHIPPING_ADDRESS_UNSERVICEABLE_REASON}
                  shipping={shipping}
                  shippingType={shippingType}
                  subtotal={subtotal}
                  onTransactionSuccess={onTransactionSuccess}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      ) : (
        <InfoActionBox
          infoText={CART.emptyCartMessage}
          buttonText={ABOUT.button}
          navigateTo={"/shop"}
        />
      )}
      <MessageSnackbar
        open={openSnackbar}
        onClose={onCloseSnackbar}
        onBlur={() => dispatch(cartActionReset())}
        message={cartActionMessage}
      />
    </Container>
  );
};

export default Cart;
