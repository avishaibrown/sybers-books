import * as React from "react";
import FeaturedBook from "../components/FeaturedBook";
import { Container, Typography, Grid } from "@mui/material";
import { MOCK_SEARCH_RESULTS } from "../utils/constants";

//TODO: Get books from database

const Search = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
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
