import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sortResults,
  searchResults,
  resetSearchResultsState,
  searchForCategory,
} from "../slices/searchResults";
import {
  addToCart,
  removeFromCart,
  cartActionStart,
  cartActionSuccess,
  cartActionFailure,
  cartActionReset,
} from "../slices/cart";
import {
  Container,
  Grid,
  Pagination,
  Box,
  Stack,
  Typography,
  Chip,
  Skeleton,
  Button as MuiButton,
  Paper,
} from "@mui/material";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { useTheme, alpha } from "@mui/material/styles";

import MessageSnackbar from "../components/MessageSnackbar";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import SearchResultsSelect from "../components/SearchResultsSelect";
import { SHOP, SUCCESS, MENU_ITEMS } from "../utils/constants";
import { searchResultsCounter } from "../utils/util";

const POPULAR_SEARCH_SUGGESTIONS = [
  "Literature",
  "History",
  "Art",
  "Philosophy",
  "Antiquarian",
  "Science Fiction",
  "Poetry",
  "Travel & Places",
];

const Shop = () => {
  const results = useSelector((state) => state.searchResults.searchResults);
  const sortedResults = useSelector((state) => state.searchResults.sortedResults);
  const loading = useSelector((state) => state.searchResults.loading);
  const error = useSelector((state) => state.searchResults.error);
  const searchTerm = useSelector((state) => state.searchResults.searchTerm);
  const cart = useSelector((state) => state.cart.cart);
  const cartLoading = useSelector((state) => state.cart.cartLoading);
  const cartError = useSelector((state) => state.cart.cartError);
  const bookAddedToCart = useSelector((state) => state.cart.bookAddedToCart);
  const bookRemovedFromCart = useSelector((state) => state.cart.bookRemovedFromCart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(SHOP.booksPerPageMenuItems[0].value);
  const [sortBy, setSortBy] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [cartActionMessage, setCartActionMessage] = useState("");

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

  const onSearch = (term) => {
    if (term) {
      dispatch(searchResults(term));
    } else {
      dispatch(resetSearchResultsState());
    }
    setSortBy("");
    setPage(0);
  };

  const onCategoryClick = (category) => {
    dispatch(searchForCategory(category));
    setSortBy("");
    setPage(0);
  };

  const onClearSearch = () => {
    dispatch(resetSearchResultsState());
    setSortBy("");
    setPage(0);
  };

  const onChangeSortBy = (event) => {
    setSortBy(event.target.value);
    dispatch(sortResults(event.target.value));
  };

  const onChangeBooksPerPage = (event) => {
    setBooksPerPage(event.target.value);
    setPage(0);
  };

  const onCartAction = (book, action) => {
    dispatch(cartActionReset());
    dispatch(cartActionStart());
    try {
      if (action === "add") {
        dispatch(addToCart(book));
      } else if (action === "remove") {
        dispatch(removeFromCart(book));
      }
      dispatch(cartActionSuccess({ book, action }));
    } catch (err) {
      dispatch(cartActionFailure(err.message));
    }
  };

  const onChangePage = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 260, behavior: "smooth" });
  };

  const onCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const hasResults = sortedResults && sortedResults.length > 0;

  return (
    <Box component="section" sx={{ pb: 10 }}>
      {/* 1. Header Banner & Search Bar */}
      <Box
        sx={{
          backgroundColor: "#FCFAF6",
          borderBottom: `1px solid rgba(24, 65, 50, 0.12)`,
          py: { xs: 5, md: 7 },
          px: 2,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            variant="caption"
            sx={{
              color: "secondary.main",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "block",
              mb: 1,
            }}
          >
            Online Rare Book Catalog
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.8rem" },
              fontWeight: 700,
              color: "primary.main",
              mb: 3,
            }}
          >
            Find Your Next Literary Treasure
          </Typography>

          <SearchBar
            placeholder={SHOP.searchBarPlaceholder}
            onSearch={onSearch}
            value={searchTerm}
          />

          {/* Active Search / Category Indicator */}
          {searchTerm && (
            <Box sx={{ mt: 2.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Active filter:
              </Typography>
              <Chip
                label={searchTerm}
                onDelete={onClearSearch}
                color="primary"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  borderRadius: "6px",
                }}
              />
            </Box>
          )}
        </Container>
      </Box>

      {/* 2. Main Catalog Body */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Loading Skeletons */}
        {loading && (
          <Box sx={{ py: 4 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
              <Skeleton variant="text" width={220} height={32} />
              <Skeleton variant="rectangular" width={200} height={36} sx={{ borderRadius: "8px" }} />
            </Stack>
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} sm={6} lg={4} key={`skeleton-${item}`}>
                  <Skeleton
                    variant="rectangular"
                    height={230}
                    sx={{ borderRadius: "14px" }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Search Results Display */}
        {!loading && hasResults && (
          <>
            {/* Toolbar: Counter & Sort Dropdowns */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{
                py: 2.5,
                mb: 3,
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
              }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              spacing={2}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontWeight: 700,
                    color: "primary.main",
                  }}
                >
                  {SHOP.searchResultsTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {searchResultsCounter(booksPerPage, results.length, page)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <SearchResultsSelect
                  label={SHOP.sortByLabel}
                  value={sortBy}
                  onChange={onChangeSortBy}
                  menuItems={SHOP.sortByMenuItems}
                />
                <SearchResultsSelect
                  label={SHOP.booksPerPageLabel}
                  value={booksPerPage}
                  onChange={onChangeBooksPerPage}
                  menuItems={SHOP.booksPerPageMenuItems}
                />
              </Box>
            </Stack>

            {/* Product Cards Grid */}
            <Grid container spacing={3}>
              {sortedResults
                .slice(page * booksPerPage, page * booksPerPage + booksPerPage)
                .map(
                  (book, index) =>
                    book.TITLE &&
                    book.AUTHOR &&
                    book.PRICE &&
                    book.SERIAL && (
                      <BookCard
                        key={`book-card-${book.SERIAL}-${index}`}
                        book={book}
                        onCartAction={onCartAction}
                        loading={cartLoading}
                        addToCart={cart.every((obj) => obj.SERIAL !== book.SERIAL)}
                        missingValuesText={SHOP.missingValuesText}
                        modalTabs={SHOP.modalTabs}
                        disabled={book.STATUS === SUCCESS.soldStatus}
                      />
                    )
                )}
            </Grid>

            {/* Pagination Controls */}
            {results.length > booksPerPage && (
              <Box sx={{ display: "flex", my: 6, justifyContent: "center" }}>
                <Pagination
                  count={Math.ceil(results.length / booksPerPage)}
                  page={page + 1}
                  onChange={(event, value) => onChangePage(value - 1)}
                  size="large"
                  color="primary"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      borderRadius: "8px",
                      fontWeight: 600,
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}

        {/* Empty / Initial State */}
        {!loading && !hasResults && (
          <Paper
            elevation={0}
            sx={{
              textAlign: "center",
              py: { xs: 8, md: 10 },
              px: 3,
              my: 4,
              borderRadius: "16px",
              backgroundColor: "#FFFFFF",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
              boxShadow: "0 4px 20px rgba(28, 53, 45, 0.04)",
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                color: "secondary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2.5,
              }}
            >
              <AutoStoriesOutlinedIcon sx={{ fontSize: 32 }} />
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
              {searchTerm ? "No Matching Volumes Found" : "Search Our Rare Collection"}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 540, mx: "auto", mb: 4, lineHeight: 1.6 }}
            >
              {error
                ? `Error retrieving catalog: ${error}. Please try again.`
                : searchTerm
                ? `We couldn't find any books matching "${searchTerm}". Try a broader term, or explore one of our popular departments below.`
                : "Type an author, book title, or genre into the search bar above to browse over 100,000 unique second-hand volumes."}
            </Typography>

            {/* Popular Department Suggestions */}
            <Box sx={{ maxWidth: 640, mx: "auto", mb: 4 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  mb: 1.5,
                  fontSize: "0.85rem",
                  letterSpacing: "0.04em",
                }}
              >
                Recommended Departments:
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                justifyContent="center"
                useFlexGap
              >
                {POPULAR_SEARCH_SUGGESTIONS.map((category) => (
                  <Chip
                    key={`suggested-${category}`}
                    label={category}
                    onClick={() => onCategoryClick(category)}
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      color: "primary.main",
                      fontWeight: 500,
                      borderRadius: "6px",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "secondary.main",
                        color: "#FFFFFF",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {searchTerm && (
              <MuiButton
                variant="outlined"
                startIcon={<RestartAltRoundedIcon />}
                onClick={onClearSearch}
                sx={{
                  borderRadius: "30px",
                  px: 3,
                  py: 1,
                  borderColor: alpha(theme.palette.primary.main, 0.25),
                  color: "primary.main",
                  fontWeight: 600,
                }}
              >
                Reset Search
              </MuiButton>
            )}
          </Paper>
        )}
      </Container>

      {/* Cart Feedback Toast */}
      <MessageSnackbar
        open={openSnackbar}
        onClose={onCloseSnackbar}
        onBlur={() => dispatch(cartActionReset())}
        message={cartActionMessage}
        onNavigate={() => navigate(MENU_ITEMS[4].link)}
        navigateToText={SHOP.viewCart}
      />
    </Box>
  );
};

export default Shop;
