import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortResults, searchResults } from "../slices/searchResults";
import { addToCart, removeFromCart } from "../slices/cart";
import BookCard from "../components/BookCard";
import {
  Container,
  Grid,
  Backdrop,
  CircularProgress,
  Pagination,
  Box,
  Stack,
} from "@mui/material";
import Typography from "../components/Typography";
import { SHOP } from "../utils/constants";
import { searchResultsCounter } from "../utils/util";
import SearchBar from "../components/SearchBar";
import SearchResultsSelect from "../components/SearchResultsSelect";

const Shop = () => {
  //NOTE: Only returning books that have a title, author and price
  //NOTE: Search only works for exact matches - can integrate a third-party library
  //      that can query substrings from Firebase, but might cost

  const results = useSelector((state) => state.searchResults.searchResults);
  const sortedResults = useSelector(
    (state) => state.searchResults.sortedResults
  );
  const loading = useSelector((state) => state.searchResults.loading);
  const error = useSelector((state) => state.searchResults.error);
  const cart = useSelector((state) => state.cart.cart);
  const searchTerm = useSelector((state) => state.searchResults.searchTerm);

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(
    SHOP.booksPerPageMenuItems[0].label
  );
  const [sortBy, setSortBy] = useState("");

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
    if (action === "add") {
      dispatch(addToCart(book));
    } else if (action === "remove") {
      dispatch(removeFromCart(book));
    }
  };

  const onChangePage = (page) => {
    setPage(page);
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
        <Box my={10} display="flex" sx={{ justifyContent: "center" }}>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem", lg: "1.5rem" },
            }}
          >
            {SHOP.noResults}
          </Typography>
        </Box>
      )}
      {error && (
        <Container>
          <Typography>{SHOP.searchResultsError}</Typography>
        </Container>
      )}
    </Container>
  );
};

export default Shop;
