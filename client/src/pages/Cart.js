import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  addToCart,
  cartActionStart,
  cartActionSuccess,
  cartActionFailure,
  cartActionReset,
  setEmail,
  checkoutStart,
  checkoutReset,
  checkoutFailure,
} from "../slices/cart";
import {
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
  Backdrop,
  CircularProgress,
  Alert,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Typography from "../components/Typography";
import Button from "../components/Button";
import BookModal from "../components/BookModal";
import InfoActionBox from "../components/InfoActionBox";
import MessageSnackbar from "../components/MessageSnackbar";
import { CART, SHOP, ABOUT } from "../utils/constants";
import { truncateString, formatAsCurrency, checkValidity } from "../utils/util";

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);
  const cartLoading = useSelector((state) => state.cart.cartLoading);
  const cartError = useSelector((state) => state.cart.cartError);
  const bookAddedToCart = useSelector((state) => state.cart.bookAddedToCart);
  const bookRemovedFromCart = useSelector(
    (state) => state.cart.bookRemovedFromCart
  );
  const subtotal = useSelector((state) => state.cart.subtotal);
  const email = useSelector((state) => state.cart.email);
  const checkoutLoading = useSelector((state) => state.cart.checkoutLoading);
  const checkoutError = useSelector((state) => state.cart.checkoutError);
  const [openModal, setOpenModal] = useState(false);
  const [bookToDisplay, setBookToDisplay] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [cartActionMessage, setCartActionMessage] = useState("");
  const [emailField, setEmailField] = useState({
    valid: false,
    touched: false,
  });
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    //reset openSnackbar state on each render to stop it popping up each time
    setOpenSnackbar(false);
  }, []);

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

  const onCartAction = (book, action) => {
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

  const onBookClick = (book) => {
    setBookToDisplay(book);
    setOpenModal(true);
  };

  const onCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onEmailChange = (event) => {
    dispatch(setEmail(event.target.value));
    setEmailField({ touched: false });
  };

  const onEmailBlur = (event) => {
    setEmailField({
      valid: checkValidity(event.target.value, CART.emailField.validations),
      touched: true,
    });
  };

  const onCheckout = async (event) => {
    event.preventDefault();
    if (emailField.valid) {
      dispatch(checkoutStart());
      fetch(process.env.REACT_APP_CHECKOUT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          customerEmail: email,
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          return res.json().then((json) => Promise.reject(json));
        })
        .then(({ url }) => {
          dispatch(checkoutReset());
          window.location = url; // Forwarding to Stripe
        })
        .catch((error) => {
          dispatch(checkoutFailure(error.message));
        });
    }
  };

  useEffect(() => {
    checkoutError && window.scrollTo(0, 0);
  }, [checkoutError]);

  return (
    <Container
      component="section"
      sx={{
        mt: { xs: 5, md: 10 },
        mb: { md: 10 },
        alignItems: "center",
        textAlign: "center",
      }}
      disableGutters
      maxWidth={false}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={cartLoading || checkoutLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {checkoutError && (
        <Alert
          severity="error"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mx: 5,
            mb: 5,
          }}
          onClose={() => dispatch(checkoutReset())}
        >
          {CART.checkoutErrorMessage}
        </Alert>
      )}
      <Typography
        variant="h2"
        gutterBottom
        marked="center"
        sx={{
          fontSize: { xs: "2.5rem", md: "3.75rem" },
          mb: { xs: 5, md: 10 },
        }}
      >
        {CART.title}
      </Typography>
      {cart.length > 0 ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={10}>
            <TableContainer component={Paper}>
              <Table
                sx={{
                  minWidth: { xs: 200, sm: 400, md: 600, lg: 800, xl: 1400 },
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
                          onClick={() => onCartAction(book, "remove")}
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
                            {book.TITLE
                              ? truncateString(
                                  book.TITLE,
                                  fullScreen ? 80 : 100,
                                  true
                                )
                              : SHOP.missingValuesText.title}
                          </Link>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ fontSize: { xs: "0.9rem", md: "1.25rem" } }}
                          >
                            {book.AUTHOR
                              ? truncateString(
                                  book.AUTHOR,
                                  fullScreen ? 50 : 80,
                                  true
                                )
                              : SHOP.missingValuesText.author}
                          </Typography>
                        </Box>
                        <BookModal
                          open={openModal}
                          setOpen={setOpenModal}
                          book={bookToDisplay}
                          onCartAction={onCartAction}
                          loading={cartLoading}
                          addToCart={cart.every(
                            (obj) => obj.SERIAL !== book.SERIAL
                          )}
                          missingValuesText={SHOP.missingValuesText}
                          modalTabs={SHOP.modalTabs}
                        />
                      </TableCell>
                      <TableCell>{formatAsCurrency(book.PRICE)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ backgroundColor: "#F6F6F6" }}>
                    <TableCell rowSpan={1} />
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      {CART.subtotal}
                    </TableCell>
                    <TableCell align="left">
                      {formatAsCurrency(subtotal)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Container
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              py: 5,
              minWidth: { xs: 200, sm: 400, md: 600, lg: 800, xl: 1400 },
            }}
          >
            <form onSubmit={onCheckout}>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={12} md={10}>
                  <TextField
                    id={CART.emailField.id}
                    label={CART.emailField.label}
                    name={CART.emailField.name}
                    required={true}
                    variant="outlined"
                    onBlur={onEmailBlur}
                    onChange={onEmailChange}
                    autoFocus={true}
                    fullWidth
                    value={email}
                    disabled={checkoutLoading}
                    error={!emailField.valid && emailField.touched}
                    helperText={
                      !emailField.valid &&
                      emailField.touched &&
                      CART.emailField.error
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={onCheckout}
                  >
                    {CART.buttonText}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
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
