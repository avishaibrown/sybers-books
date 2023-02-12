import { useState, useEffect, useRef } from "react";
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
import Button from "../components/Button";
import GooglePay from "../components/GooglePayButton";
import BookModal from "../components/BookModal";
import {
  SHIPPING_ADDRESS_UNSERVICEABLE_REASON,
  SHIPPING_OPTIONS,
  CART,
  UNSERVICEABLE_SHIPPING_COUNTRIES,
  SHOP,
  ABOUT,
} from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
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

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const cancelledAlertRef = useRef(null);

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
    window.scrollTo(0, 0);
    cancelledAlertRef.current && cancelledAlertRef.current.focus();
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
        mt: cancelled ? 0 : { xs: 5, md: 10 },
        mb: { md: 10 },
        alignItems: "center",
        textAlign: "center",
      }}
      disableGutters
      maxWidth={false}
    >
      {cancelled && (
        <Box m={3}>
          <Alert
            onClose={() => setCancelled(false)}
            severity="info"
            variant="filled"
            autoHideDuration={6000}
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
                        value={subtotal.toFixed(2)}
                        displayType={"text"}
                        prefix={"$"}
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
                        value={subtotal.toFixed(2)}
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
                        value={total.toFixed(2)}
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
                amount={total.toString()}
                onCancelHandler={onCancelTransaction}
                shippingOptions={SHIPPING_OPTIONS}
                unserviceableCountries={UNSERVICEABLE_SHIPPING_COUNTRIES}
                unserviceableReason={SHIPPING_ADDRESS_UNSERVICEABLE_REASON}
              ></GooglePay>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box
          component="section"
          sx={{ display: "flex", bgcolor: "#F6F6F6", overflow: "hidden" }}
        >
          <Container
            sx={{
              my: { xs: 5, md: 10 },
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src="./images/wallpaper-curvy-lines.png"
              alt="curvy lines"
              sx={{ pointerEvents: "none", position: "absolute", top: -180 }}
            />
            <Typography
              sx={{
                typography: { xs: "h6", xl: "h5" },
              }}
              m={{ xs: 1, lg: 3 }}
            >
              {CART.emptyCartMessage}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate("/shop")}
              sx={{ textTransform: "none", mt: 5 }}
            >
              {ABOUT.button}
            </Button>
          </Container>
        </Box>
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
