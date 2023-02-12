import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortResults, searchResults } from "../slices/searchResults";
import {
  addToCart,
  removeFromCart,
  cartActionStart,
  cartActionSuccess,
  cartActionFailure,
} from "../slices/cart";
import {
  Container,
  Grid,
  Backdrop,
  CircularProgress,
  Pagination,
  Box,
  Stack,
  Snackbar,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Typography from "../components/Typography";
import { SHOP } from "../utils/constants";
import { searchResultsCounter } from "../utils/util";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import SearchResultsSelect from "../components/SearchResultsSelect";

const Shop = () => {
  const results = useSelector((state) => state.searchResults.searchResults);
  const sortedResults = useSelector(
    (state) => state.searchResults.sortedResults
  );
  const loading = useSelector((state) => state.searchResults.loading);
  const error = useSelector((state) => state.searchResults.error);
  const searchTerm = useSelector((state) => state.searchResults.searchTerm);
  const cart = useSelector((state) => state.cart.cart);
  const bookAddedToCart = useSelector((state) => state.cart.bookAddedToCart);
  const bookRemovedFromCart = useSelector(
    (state) => state.cart.bookRemovedFromCart
  );

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(
    SHOP.booksPerPageMenuItems[0].label
  );
  const [sortBy, setSortBy] = useState("");
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

  const onSearch = (term) => {
    dispatch(searchResults(term));
    setSortBy("");
  };

  const onChangeSortBy = (event) => {
    setSortBy(event.target.value);
    dispatch(sortResults(event.target.value));
  };

  const onChangeBooksPerPage = (event) => {
    setBooksPerPage(event.target.value);
  };

  const onCartClick = (book, action) => {
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

  const onChangePage = (page) => {
    setPage(page);
  };

  const onCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="section" maxWidth={false} disableGutters>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={(theme) => ({
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          [theme.breakpoints.up("xs")]: {
            height: "80vh",
            minHeight: 50,
            maxHeight: 350,
          },
          backgroundColor: "#D2F7FE",
        })}
      >
        <SearchBar
          label={SHOP.searchBarLabel}
          onSearch={(value) => onSearch(value)}
          value={searchTerm}
          id={"search-bar"}
        />
      </Box>
      {sortedResults?.length > 0 ? (
        <Container maxWidth={false}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{ py: 5, px: 1 }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
            spacing={{ xs: 2, md: 0 }}
          >
            <Typography variant="h4">{SHOP.searchResultsTitle}</Typography>
            <Typography variant="body1">
              {searchResultsCounter(booksPerPage, results.length, page)}
            </Typography>
            <Box>
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
          <Grid container spacing={4}>
            {sortedResults
              .slice(page * booksPerPage, page * booksPerPage + booksPerPage)
              .map(
                (book) =>
                  book.title1 &&
                  book.authorSn &&
                  book.price1 &&
                  book.Serial && (
                    <BookCard
                      key={book.Serial}
                      book={book}
                      onClickHandler={onCartClick}
                      addToCart={cart.every(
                        (obj) => obj.Serial !== book.Serial
                      )}
                      missingValuesText={SHOP.missingValuesText}
                      modalTabs={SHOP.modalTabs}
                    />
                  )
              )}
          </Grid>
          <Box sx={{ display: "flex", my: 5, justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(results.length / booksPerPage)}
              page={page + 1}
              onChange={(event, value) => onChangePage(value - 1)}
              size="large"
              color="secondary"
            />
          </Box>
        </Container>
      ) : (
        <Box
          m={10}
          display="flex"
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem", lg: "1.5rem" },
            }}
          >
            {SHOP.noResults}
            <List
              sx={{
                listStyleType: "disc",
                pl: 4,
                "& .MuiListItem-root": {
                  display: "list-item",
                },
              }}
            >
              {SHOP.noResultsSuggestions.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </List>
          </Typography>
        </Box>
      )}
      {error && (
        <Container>
          <Typography>{SHOP.searchResultsError}</Typography>
        </Container>
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

export default Shop;
