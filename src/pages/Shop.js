import { useState } from "react";
import BookCard from "../components/BookCard";
import {
  Container,
  Grid,
  Backdrop,
  CircularProgress,
  Pagination,
  Box,
} from "@mui/material";
import Typography from "../components/Typography";
import { SHOP } from "../utils/constants";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { searchResults } from "../slices/searchResults";
import { addToCart, removeFromCart } from "../slices/cart";

const Shop = () => {
  //NOTE: Only returning books that have a title, author and price
  //NOTE: Search only works for exact matches - can integrate a third-party library
  //      that can query substrings from Firebase, but might cost

  //TODO: Add filter to search results (Sort price high to low, low to high etc.)
  //TODO: Add styling to Shop component

  const results = useSelector((state) => state.searchResults.searchResults);
  const loading = useSelector((state) => state.searchResults.loading);
  const error = useSelector((state) => state.searchResults.error);
  const cart = useSelector((state) => state.cart.cart);
  const searchTerm = useSelector((state) => state.searchResults.searchTerm);

  const [page, setPage] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(12);

  const onChangePage = (page) => {
    setPage(page);
  };

  const dispatch = useDispatch();

  const searchResultsHandler = (term) => {
    dispatch(searchResults(term));
  };

  const onClickHandler = (book, action) => {
    if (action === "add") {
      dispatch(addToCart(book));
    } else if (action === "remove") {
      dispatch(removeFromCart(book));
    }
  };

  return (
    <Container
      component="section"
      sx={{
        mt: { xs: 20, md: 25 },
        mb: 10,
        alignItems: "center",
      }}
      maxWidth={false}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SearchBar
        onSearch={(value) => searchResultsHandler(value)}
        value={searchTerm}
        id={"search-bar"}
      />
      {results.length > 0 && (
        <>
          <Typography variant="h4" gutterBottom sx={{ pt: 5 }}>
            {SHOP.searchResultsTitle}
          </Typography>
          <Box sx={{ display: "flex", my: 5, justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(results.length / booksPerPage)}
              page={page + 1}
              onChange={(event, value) => onChangePage(value - 1)}
              size="large"
              color="secondary"
            />
          </Box>
          <Grid container spacing={4}>
            {results
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
                      onClickHandler={onClickHandler}
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
        </>
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
