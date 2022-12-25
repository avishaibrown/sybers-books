import { useState, useCallback, useEffect } from "react";
import FeaturedBook from "../components/FeaturedBook";
import {
  Container,
  Typography,
  Grid,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { SEARCH_RESULTS_TITLE } from "../utils/constants";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { searchBooks } from "../slices/books";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  //TODO: enhance search to include filter options + search by title, author etc.

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

  return (
    <Container sx={{ p: 2 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SearchBar onSearch={(value) => setSearchTerm(value)} id={"search-bar"} />
      {books.length > 0 && (
        <>
          <Typography variant="h4" gutterBottom sx={{ pt: 5 }}>
            {SEARCH_RESULTS_TITLE}
          </Typography>
          <Grid container spacing={4}>
            {books.map((book) => (
              <FeaturedBook key={book.Serial} book={book} />
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Search;
