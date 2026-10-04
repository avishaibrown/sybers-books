import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  removeFromCart,
  addToCart,
  cartActionStart,
  cartActionSuccess,
  cartActionFailure,
  cartActionReset,
  setEmail,
  setShippingLocation,
  checkoutStart,
  checkoutReset,
  checkoutFailure,
} from "../slices/cart";
import { getApiUrl, getBookImageUrl } from "../utils/util";
import {
  Container,
  Paper,
  Box,
  Grid,
  Typography,
  IconButton,
  Button as MuiButton,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Divider,
  Alert,
  CircularProgress,
  Stack,
  Chip,
  Tooltip,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useTheme, alpha } from "@mui/material/styles";

import BookModal from "../components/BookModal";
import MessageSnackbar from "../components/MessageSnackbar";
import { CART, SHOP } from "../utils/constants";
import { formatAsCurrency, checkValidity } from "../utils/util";

const Cart = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const cart = useSelector((state) => state.cart.cart);
  const cartLoading = useSelector((state) => state.cart.cartLoading);
  const cartError = useSelector((state) => state.cart.cartError);
  const bookAddedToCart = useSelector((state) => state.cart.bookAddedToCart);
  const bookRemovedFromCart = useSelector((state) => state.cart.bookRemovedFromCart);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const email = useSelector((state) => state.cart.email);
  const shippingLocation = useSelector((state) => state.cart.shippingLocation);
  const checkoutLoading = useSelector((state) => state.cart.checkoutLoading);
  const checkoutError = useSelector((state) => state.cart.checkoutError);

  const [openModal, setOpenModal] = useState(false);
  const [bookToDisplay, setBookToDisplay] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [cartActionMessage, setCartActionMessage] = useState("");
  const [emailField, setEmailField] = useState({
    valid: checkValidity(email, CART.emailField.validations),
    touched: false,
  });

  useEffect(() => {
    setOpenSnackbar(false);
  }, []);

  useEffect(() => {
    if (bookAddedToCart) {
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
    if (checkoutError) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [checkoutError]);

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
    const val = event.target.value;
    dispatch(setEmail(val));
    setEmailField({
      valid: checkValidity(val, CART.emailField.validations),
      touched: true,
    });
  };

  const onEmailBlur = (event) => {
    setEmailField({
      valid: checkValidity(event.target.value, CART.emailField.validations),
      touched: true,
    });
  };

  const onShippingChange = (event) => {
    dispatch(setShippingLocation(event.target.value));
  };

  const onCheckout = async (event) => {
    event.preventDefault();
    const isValid = checkValidity(email, CART.emailField.validations);
    setEmailField({
      valid: isValid,
      touched: true,
    });

    if (!isValid) return;

    dispatch(checkoutStart());
    try {
      const response = await Promise.race([
        fetch(getApiUrl("/checkout"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cart,
            customerEmail: email,
            shippingLocation: shippingLocation || CART.shippingField.options[0].value,
          }),
        }),
        new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error("Checkout request timed out. Please try again."));
          }, CART.timeout);
        }),
      ]);

      const json = await response.json();
      if (response.ok && json.url) {
        dispatch(checkoutReset());
        window.location = json.url; // Forward to Stripe
      } else {
        dispatch(checkoutFailure(json.message || "Failed to initiate payment session."));
      }
    } catch (err) {
      dispatch(checkoutFailure(err.message || "Network error. Please try again."));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Page Title (Only when cart has items) */}
      {cart.length > 0 && (
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              fontSize: { xs: "2.2rem", md: "3rem" },
              color: "primary.main",
              mb: 1,
            }}
          >
            Your Shopping Bag
          </Typography>
          <Typography variant="body1" color="text.secondary">
            You have {cart.length} rare volume{cart.length > 1 ? "s" : ""} in your bag.
          </Typography>
        </Box>
      )}

      {/* Error Alert */}
      {checkoutError && (
        <Alert
          severity="error"
          sx={{
            mb: 4,
            borderRadius: "10px",
          }}
          onClose={() => dispatch(checkoutReset())}
        >
          {CART.checkoutErrorMessageLine1}
          <strong>{checkoutError}</strong>
          {CART.checkoutErrorMessageLine2}
        </Alert>
      )}

      {cart.length > 0 ? (
        <Grid container spacing={{ xs: 4, lg: 5 }}>
          {/* Left Column: Cart Items List */}
          <Grid item xs={12} lg={7.5}>
            <Stack spacing={2.5}>
              {cart.map((book, index) => {
                const imageSrc = getBookImageUrl(book["IMAGE URL"]);

                return (
                  <Paper
                    key={`cart-item-${book.SERIAL}-${index}`}
                    elevation={0}
                    sx={{
                      p: { xs: 2, sm: 2.5 },
                      borderRadius: "14px",
                      backgroundColor: "#FFFFFF",
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 2.5,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: alpha(theme.palette.primary.main, 0.2),
                        boxShadow: "0 6px 18px rgba(28, 53, 45, 0.05)",
                      },
                    }}
                  >
                    {/* Cover Thumbnail */}
                    <Box
                      component="img"
                      src={imageSrc}
                      alt={book.TITLE}
                      onClick={() => onBookClick(book)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "./images/no-image-found.jpg";
                      }}
                      sx={{
                        width: { xs: 70, sm: 84 },
                        height: { xs: 95, sm: 114 },
                        objectFit: "cover",
                        borderRadius: "8px",
                        cursor: "pointer",
                        flexShrink: 0,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                      }}
                    />

                    {/* Book Metadata */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      {book.CATEGORY && (
                        <Chip
                          label={book.CATEGORY}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                            color: "secondary.main",
                            mb: 0.8,
                            borderRadius: "4px",
                          }}
                        />
                      )}
                      <Typography
                        variant="h6"
                        onClick={() => onBookClick(book)}
                        sx={{
                          fontSize: { xs: "1rem", sm: "1.1rem" },
                          fontWeight: 700,
                          color: "primary.main",
                          cursor: "pointer",
                          lineHeight: 1.3,
                          mb: 0.4,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          "&:hover": {
                            color: "secondary.main",
                          },
                        }}
                      >
                        {book.TITLE || SHOP.missingValuesText.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.85rem", mb: 0.8 }}
                      >
                        by {book.AUTHOR || SHOP.missingValuesText.author}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block", fontSize: "0.75rem" }}
                      >
                        Serial: {book.SERIAL || "—"}
                      </Typography>
                    </Box>

                    {/* Price & Remove Action */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        height: "100%",
                        gap: 2,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 700,
                          color: "primary.main",
                          fontSize: { xs: "1.1rem", sm: "1.25rem" },
                        }}
                      >
                        {formatAsCurrency(book.PRICE)}
                      </Typography>

                      <Tooltip title="Remove item" arrow>
                        <IconButton
                          onClick={() => onCartAction(book, "remove")}
                          aria-label="remove book from cart"
                          size="small"
                          sx={{
                            color: "text.secondary",
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            borderRadius: "8px",
                            "&:hover": {
                              color: "#d32f2f",
                              backgroundColor: alpha("#d32f2f", 0.08),
                              borderColor: "#d32f2f",
                            },
                          }}
                        >
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Paper>
                );
              })}

              {/* Continue Shopping Link */}
              <Box sx={{ pt: 1 }}>
                <MuiButton
                  component={RouterLink}
                  to="/shop"
                  startIcon={<ArrowBackRoundedIcon />}
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  Continue Browsing Rare Books
                </MuiButton>
              </Box>
            </Stack>
          </Grid>

          {/* Right Column: Sticky Order Summary Card */}
          <Grid item xs={12} lg={4.5}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: "16px",
                backgroundColor: "#FFFFFF",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: "0 8px 30px rgba(28, 53, 45, 0.06)",
                position: { lg: "sticky" },
                top: 100,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  color: "primary.main",
                  mb: 2.5,
                }}
              >
                Order Summary
              </Typography>

              {/* Subtotal Row */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="body1" color="text.secondary">
                  Items Subtotal ({cart.length})
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {formatAsCurrency(subtotal)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2, borderColor: alpha(theme.palette.primary.main, 0.08) }} />

              {/* Shipping Radio Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  {CART.shippingField.label}
                </Typography>
                <RadioGroup
                  name={CART.shippingField.name}
                  value={shippingLocation || CART.shippingField.options[0].value}
                  onChange={onShippingChange}
                >
                  {CART.shippingField.options.map((option, idx) => (
                    <FormControlLabel
                      key={`ship-opt-${idx}`}
                      value={option.value}
                      control={<Radio size="small" color="primary" />}
                      label={
                        <Typography variant="body2" sx={{ fontSize: "0.88rem" }}>
                          {option.label}
                        </Typography>
                      }
                      sx={{
                        mb: 0.5,
                        p: 1,
                        borderRadius: "8px",
                        backgroundColor:
                          (shippingLocation || CART.shippingField.options[0].value) ===
                          option.value
                            ? alpha(theme.palette.primary.main, 0.04)
                            : "transparent",
                      }}
                    />
                  ))}
                </RadioGroup>
              </Box>

              {/* Customer Email Form Field */}
              <Box component="form" onSubmit={onCheckout} sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    mb: 1,
                  }}
                >
                  Customer Email (for receipt & tracking)
                </Typography>
                <TextField
                  id="checkout-email-input"
                  placeholder="your.email@example.com"
                  size="small"
                  fullWidth
                  value={email || ""}
                  onChange={onEmailChange}
                  onBlur={onEmailBlur}
                  error={!emailField.valid && emailField.touched}
                  helperText={
                    !emailField.valid && emailField.touched ? CART.emailField.error : ""
                  }
                  disabled={checkoutLoading}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      backgroundColor: "#FFFFFF",
                    },
                  }}
                />

                <Divider sx={{ my: 2.5, borderColor: alpha(theme.palette.primary.main, 0.08) }} />

                {/* Total Row */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "primary.main" }}>
                    Total (AUD)
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "primary.main",
                      fontFamily: '"Playfair Display", Georgia, serif',
                    }}
                  >
                    {formatAsCurrency(subtotal)}
                  </Typography>
                </Box>

                {/* Checkout CTA */}
                <MuiButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={checkoutLoading || cartLoading}
                  startIcon={
                    checkoutLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <LockOutlinedIcon />
                    )
                  }
                  sx={{
                    py: 1.5,
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    borderRadius: "10px",
                    backgroundColor: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.light",
                    },
                  }}
                >
                  {checkoutLoading ? "Connecting to Stripe..." : "Proceed to Secure Checkout"}
                </MuiButton>
              </Box>

              {/* Trust Badges */}
              <Stack spacing={1.2} sx={{ pt: 2, borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.08)}` }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LockOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary">
                    256-Bit SSL Encrypted & Stripe Secured
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocalShippingOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary">
                    Tracked Australian & Worldwide Courier
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <VerifiedUserOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary">
                    Authenticity & Quality Guaranteed
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        /* Empty Cart State */
        <Paper
          elevation={0}
          sx={{
            textAlign: "center",
            py: { xs: 8, md: 12 },
            px: 3,
            borderRadius: "16px",
            backgroundColor: "#FFFFFF",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
            maxWidth: 620,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              backgroundColor: alpha(theme.palette.secondary.main, 0.1),
              color: "secondary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 3,
            }}
          >
            <ShoppingBagOutlinedIcon sx={{ fontSize: 36 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              color: "primary.main",
              mb: 1.5,
            }}
          >
            Your Shopping Bag is Empty
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 440, mx: "auto", mb: 4, lineHeight: 1.6 }}
          >
            You haven't added any books yet. Explore our curated catalog of rare and
            out-of-print titles to find something extraordinary.
          </Typography>
          <MuiButton
            component={RouterLink}
            to="/shop"
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.4,
              backgroundColor: "primary.main",
              fontWeight: 600,
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
          >
            Explore Rare Books
          </MuiButton>
        </Paper>
      )}

      {/* Book Detail Modal */}
      <BookModal
        open={openModal}
        setOpen={setOpenModal}
        book={bookToDisplay}
        onCartAction={onCartAction}
        loading={cartLoading}
        addToCart={cart.every((obj) => obj.SERIAL !== bookToDisplay.SERIAL)}
        missingValuesText={SHOP.missingValuesText}
        modalTabs={SHOP.modalTabs}
      />

      {/* Cart Feedback Toast */}
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
