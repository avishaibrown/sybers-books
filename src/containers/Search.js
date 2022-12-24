import { useState, useCallback, useEffect } from "react";
import FeaturedBook from "../components/FeaturedBook";
import {
  Container,
  Typography,
  Grid,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { MOCK_SEARCH_RESULTS } from "../utils/constants";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { searchBooks } from "../slices/books";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);

  const dispatch = useDispatch();

  const searchBooksHandler = useCallback(
    (term) => dispatch(searchBooks(term)),
    [dispatch]
  );

  useEffect(() => {
    searchTerm && searchBooksHandler(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  console.log("books", books);

  return (
    <Container sx={{ p: 2 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SearchBar onSearch={(value) => setSearchTerm(value)} id={"search-bar"} />
      <Typography variant="h4" gutterBottom sx={{ pt: 5 }}>
        {MOCK_SEARCH_RESULTS.title}
      </Typography>
      <Grid container spacing={4}>
        {MOCK_SEARCH_RESULTS.books.map((book) => (
          <FeaturedBook key={book.title} book={book} />
        ))}
      </Grid>
    </Container>
  );
};

export default Search;
