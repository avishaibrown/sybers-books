import * as React from "react";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";

const FeaturedBook = (props) => {
  const { book } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {book.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {book.author}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {book.description}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={book.image}
            alt={book.title}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default FeaturedBook;
