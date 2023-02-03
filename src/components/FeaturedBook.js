import * as React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CardActions,
  Box,
} from "@mui/material";
import Typography from "./Typography";
import { truncateString } from "../utils/util";
import CurrencyFormat from "react-currency-format";
import { RemoveShoppingCart, ShoppingCart } from "@mui/icons-material";

const FeaturedBook = (props) => {
  const { book, onClickHandler, showCart } = props;

  //TODO: Add modal for onClick of card
  //TODO: Handle no title, author, price, isbn etc.

  return (
    <Grid item xs={12} md={6} xl={4}>
      <Card
        sx={{
          display: "flex",
          height: { xs: "250px", md: "300px" },
          background: "linear-gradient(to bottom, #D2F7FE 0%, #FFFFFF 100%)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {book.title1 && truncateString(book.title1, 50, true)}
            </Typography>
            <Typography
              component="div"
              variant="subtitle1"
              color="text.secondary"
            >
              {book.authorSn && truncateString(book.authorSn, 50, true)}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", p: 2 }}>
            <Box
              sx={{
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#4caf50",
                p: 1,
                borderRadius: "0.25rem",
              }}
            >
              <Typography variant="subtitle1">
                <CurrencyFormat
                  value={book.price1}
                  displayType={"text"}
                  prefix={"$"}
                  suffix={" AUD"}
                  thousandSeparator={true}
                />
              </Typography>
            </Box>
            {showCart ? (
              <IconButton
                onClick={() => onClickHandler(book, "add")}
                aria-label="add to cart"
                sx={{ marginLeft: "auto" }}
              >
                <ShoppingCart sx={{ transform: "scale(1.5)" }} />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => onClickHandler(book, "remove")}
                aria-label="remove from cart"
                sx={{ marginLeft: "auto" }}
              >
                <RemoveShoppingCart sx={{ transform: "scale(1.5)" }} />
              </IconButton>
            )}
          </CardActions>
        </Box>
        {book?.url ? (
          <CardMedia
            component="img"
            sx={{
              width: 160,
              display: { xs: "none", sm: "block" },
              marginLeft: "auto",
            }}
            image={book?.url === "" ? "./images/no-image-found.jpg" : book.url}
            alt={book.title1}
          />
        ) : null}
      </Card>
    </Grid>
  );
};

export default FeaturedBook;
