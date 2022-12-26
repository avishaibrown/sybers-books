import * as React from "react";
import {
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import { truncateString } from "../utils/util";
import CurrencyFormat from "react-currency-format";

const FeaturedBook = (props) => {
  const { book } = props;

  //TODO: Add modal for onClick of card

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {book.title1 && truncateString(book.title1, 60, true)}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {book.authorSn && truncateString(book.authorSn, 50, true)}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              <CurrencyFormat
                value={book.price1}
                displayType={"text"}
                prefix={"$"}
                suffix={" AUD"}
                thousandSeparator={true}
              />
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={book?.url === "" ? "./no-image-found.jpg" : book.url}
            alt={book.title1}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default FeaturedBook;
