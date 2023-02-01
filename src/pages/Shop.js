import { useState } from "react";
import FeaturedBook from "../components/FeaturedBook";
import { Container, Grid, Backdrop, CircularProgress } from "@mui/material";
import Typography from "../components/Typography";
import { SEARCH_RESULTS_TITLE } from "../utils/constants";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { searchResults } from "../slices/searchResults";
import { addToCart } from "../slices/cart";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");

  //NOTE: Only returning books that have a title, author and price

  const results = useSelector((state) => state.searchResults.searchResults);
  const loading = useSelector((state) => state.searchResults.loading);
  const error = useSelector((state) => state.searchResults.error);
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  const searchResultsHandler = (term) => {
    setSearchTerm(term);
    dispatch(searchResults(term));
  };

  const addToCartHandler = (book) => {
    dispatch(addToCart(book));
  };

  return (
    <Container
      component="section"
      sx={{
        mt: { xs: 20, md: 25 },
        mb: { md: 10 },
        alignItems: "center",
        textAlign: "center",
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
        id={"search-bar"}
      />
      {results.length > 0 && (
        <>
          <Typography variant="h4" gutterBottom sx={{ pt: 5 }}>
            {SEARCH_RESULTS_TITLE}
          </Typography>
          <Grid container spacing={4}>
            {results.map(
              (book) =>
                book.title1 &&
                book.authorSn &&
                book.price1 &&
                book.Serial && (
                  <FeaturedBook
                    key={book.Serial}
                    book={book}
                    onClickHandler={addToCartHandler}
                    showCart={cart.every((obj) => obj.Serial !== book.Serial)}
                  />
                )
            )}
          </Grid>
        </>
      )}
      {error && (
        <Container>
          <Typography>ERROR</Typography>
        </Container>
      )}
    </Container>
  );
};

export default Shop;
