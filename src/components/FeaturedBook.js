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

  //TODO: Add No Image if no url is available
  //TODO: Add ellipsis to shorten title/author if too long
  //TODO: Add handler for no price available

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {book.title1}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {book.authorSn}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {book.price1}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={book.url}
            alt={book.title1}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default FeaturedBook;
