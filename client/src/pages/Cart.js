import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  addToCart,
  cartActionStart,
  cartActionSuccess,
  cartActionFailure,
  cartActionReset,
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
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Typography from "../components/Typography";
import Button from "../components/Button";
import BookModal from "../components/BookModal";
import InfoActionBox from "../components/InfoActionBox";
import MessageSnackbar from "../components/MessageSnackbar";
import { CART, SHOP, ABOUT } from "../utils/constants";
import { truncateString, formatAsCurrency } from "../utils/util";

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
  const checkoutLoading = useSelector((state) => state.cart.checkoutLoading);
  const checkoutError = useSelector((state) => state.cart.checkoutError);
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

  const onCheckout = async () => {
    dispatch(checkoutStart());
    fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
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
                              ? truncateString(book.TITLE, 80, true)
                              : SHOP.missingValuesText.title}
                          </Link>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ fontSize: { xs: "0.9rem", md: "1.25rem" } }}
                          >
                            {book.AUTHOR
                              ? truncateString(book.AUTHOR, 50, true)
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
          <Box m={5}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onCheckout}
            >
              {CART.buttonText}
            </Button>
          </Box>
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
