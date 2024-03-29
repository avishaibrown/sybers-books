import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { sortResults, searchResults } from "../slices/searchResults";
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
  Backdrop,
  CircularProgress,
  Pagination,
  Box,
  Stack,
  List,
  ListItem,
} from "@mui/material";
import MessageSnackbar from "../components/MessageSnackbar";
import Typography from "../components/Typography";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import SearchResultsSelect from "../components/SearchResultsSelect";
import { SHOP, SUCCESS, MENU_ITEMS } from "../utils/constants";
import { searchResultsCounter } from "../utils/util";

const Shop = () => {
  const results = useSelector((state) => state.searchResults.searchResults);
  const sortedResults = useSelector(
    (state) => state.searchResults.sortedResults
  );
  const loading = useSelector((state) => state.searchResults.loading);
  const error = useSelector((state) => state.searchResults.error);
  const searchTerm = useSelector((state) => state.searchResults.searchTerm);
  const cart = useSelector((state) => state.cart.cart);
  const cartLoading = useSelector((state) => state.cart.cartLoading);
  const cartError = useSelector((state) => state.cart.cartError);
  const bookAddedToCart = useSelector((state) => state.cart.bookAddedToCart);
  const bookRemovedFromCart = useSelector(
    (state) => state.cart.bookRemovedFromCart
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(
    SHOP.booksPerPageMenuItems[0].label
  );
  const [sortBy, setSortBy] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [cartActionMessage, setCartActionMessage] = useState("");

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
  }, [bookAddedToCart, bookRemovedFromCart, cartError]); // eslint-disable-line react-hooks/exhaustive-deps

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
        open={loading || cartLoading}
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
            height: { xs: "40vh", sm: "80vh" },
            minHeight: 50,
            maxHeight: 350,
          },
          background: "linear-gradient(to bottom, #F3D8A0 0%, #FFFFFF 100%)",
        })}
      >
        <SearchBar
          label={SHOP.searchBarLabel}
          placeholder={SHOP.searchBarPlaceholder}
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
                (book, index) =>
                  book.TITLE &&
                  book.AUTHOR &&
                  book.PRICE &&
                  book.SERIAL && (
                    <BookCard
                      key={"book-card-" + index}
                      book={book}
                      onCartAction={onCartAction}
                      loading={cartLoading}
                      addToCart={cart.every(
                        (obj) => obj.SERIAL !== book.SERIAL
                      )}
                      missingValuesText={SHOP.missingValuesText}
                      modalTabs={SHOP.modalTabs}
                      disabled={book.STATUS === SUCCESS.soldStatus}
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
              color="standard"
            />
          </Box>
        </Container>
      ) : (
        <Box
          m={5}
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
            {error ? SHOP.searchResultsErrorLine1 : SHOP.noResults}
            <List
              sx={{
                listStyleType: "disc",
                pl: { xs: 4, md: 8 },
                "& .MuiListItem-root": {
                  display: "list-item",
                },
              }}
            >
              {error ? (
                <ListItem>{error}</ListItem>
              ) : (
                SHOP.noResultsSuggestions.map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))
              )}
            </List>
            {error && SHOP.searchResultsErrorLine2}
          </Typography>
        </Box>
      )}
      <MessageSnackbar
        open={openSnackbar}
        onClose={onCloseSnackbar}
        onBlur={() => dispatch(cartActionReset())}
        message={cartActionMessage}
        onNavigate={() => navigate(MENU_ITEMS[4].link)}
        navigateToText={SHOP.viewCart}
      />
    </Container>
  );
};

export default Shop;
