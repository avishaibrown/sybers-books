import FeaturedBook from "../components/FeaturedBook";
import { Container, Grid, Backdrop, CircularProgress } from "@mui/material";
import Typography from "../components/Typography";
import { SEARCH_RESULTS_TITLE } from "../utils/constants";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { searchResults } from "../slices/searchResults";
import { addToCart, removeFromCart } from "../slices/cart";

const Shop = () => {
  //NOTE: Only returning books that have a title, author and price
  //NOTE: Search only works for exact matches - can integrate a third-party library
  //      that can query substrings from Firebase, but might cost

  //TODO: Add filter to search results (Sort price high to low, low to high etc.)
  //TODO: Add modal to show more detail of book
  //TODO: Add pagination

  const results = useSelector((state) => state.searchResults.searchResults);
  const loading = useSelector((state) => state.searchResults.loading);
  const error = useSelector((state) => state.searchResults.error);
  const cart = useSelector((state) => state.cart.cart);
  const searchTerm = useSelector((state) => state.searchResults.searchTerm);

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
                    onClickHandler={onClickHandler}
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
