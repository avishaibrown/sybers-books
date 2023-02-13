import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  Box,
} from "@mui/material";
import Typography from "./Typography";
import { truncateString } from "../utils/util";
import CurrencyFormat from "react-currency-format";
import { useState } from "react";
import BookModal from "./BookModal";
import CartIcon from "./CartIcon";

const BookCard = (props) => {
  const {
    book,
    onClickHandler,
    loading,
    addToCart,
    missingValuesText,
    modalTabs,
  } = props;

  const [openModal, setOpenModal] = useState(false);

  return (
    <Grid item xs={12} md={6} xl={4}>
      <Card
        sx={{
          display: "flex",
          height: { xs: "250px", md: "300px" },
          background: "linear-gradient(to bottom, #D2F7FE 0%, #FFFFFF 100%)",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 200,
            display: { xs: "none", sm: "block" },
            float: "left",
          }}
          image={book?.url === "" ? "./images/no-image-found.jpg" : book.url}
          alt={book.title1}
          onError={(event) => {
            event.target.onerror = null;
            event.target.src = "./images/no-image-found.jpg";
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <CardActionArea onClick={() => setOpenModal(true)}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {book.title1
                  ? truncateString(book.title1, 40, true)
                  : missingValuesText.title}
              </Typography>
              <Typography
                component="div"
                variant="subtitle1"
                color="text.secondary"
              >
                {book.authorSn
                  ? truncateString(book.authorSn, 25, true)
                  : missingValuesText.author}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ display: "flex", p: 2, marginTop: "auto" }}>
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
                {book.price1 ? (
                  <CurrencyFormat
                    value={book.price1}
                    displayType={"text"}
                    prefix={"$"}
                    suffix={" AUD"}
                    thousandSeparator={true}
                    decimalScale={2}
                  />
                ) : (
                  missingValuesText.price
                )}
              </Typography>
            </Box>
            <CartIcon
              addToCart={addToCart}
              onClickHandler={onClickHandler}
              book={book}
              isIcon={true}
            />
          </CardActions>
        </Box>
        <BookModal
          open={openModal}
          setOpen={setOpenModal}
          book={book}
          onClickHandler={onClickHandler}
          loading={loading}
          addToCart={addToCart}
          missingValuesText={missingValuesText}
          modalTabs={modalTabs}
        />
      </Card>
    </Grid>
  );
};

export default BookCard;
