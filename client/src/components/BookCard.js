import { useState } from "react";
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
import BookModal from "./BookModal";
import CartButton from "./CartButton";
import { truncateString, formatAsCurrency } from "../utils/util";
import { SUCCESS } from "../utils/constants";

const BookCard = (props) => {
  const {
    book,
    onClickHandler,
    loading,
    addToCart,
    missingValuesText,
    modalTabs,
    disabled,
  } = props;

  const [openModal, setOpenModal] = useState(false);

  return (
    <Grid item xs={12} md={6} xl={4}>
      <Card
        sx={{
          display: "flex",
          height: { xs: "250px", md: "300px" },
          background: disabled
            ? "linear-gradient(to bottom, #D9DBDB 0%, #FFFFFF 100%)"
            : "linear-gradient(to bottom, #D2F7FE 0%, #FFFFFF 100%)",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 200,
            display: { xs: "none", sm: "block" },
            float: "left",
          }}
          image={
            book["IMAGE URL"] === ""
              ? "./images/no-image-found.jpg"
              : book["IMAGE URL"]
          }
          alt={book.TITLE}
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
                {book.TITLE
                  ? truncateString(book.TITLE, 40, true)
                  : missingValuesText.title}
              </Typography>
              <Typography
                component="div"
                variant="subtitle1"
                color="text.secondary"
              >
                {book.AUTHOR
                  ? truncateString(book.AUTHOR, 25, true)
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
                {book.PRICE
                  ? formatAsCurrency(book.PRICE)
                  : missingValuesText.price}
              </Typography>
            </Box>
            {disabled ? (
              <Box
                sx={{
                  color: "#fff",
                  backgroundColor: "#e57373",
                  py: 1,
                  px: 3,
                  borderRadius: "0.25rem",
                  marginLeft: "auto !important",
                }}
              >
                <Typography variant="subtitle1">
                  {SUCCESS.soldStatus}
                </Typography>
              </Box>
            ) : (
              <CartButton
                addToCart={addToCart}
                onClickHandler={onClickHandler}
                book={book}
                isIcon={true}
              />
            )}
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
          disabled={disabled}
        />
      </Card>
    </Grid>
  );
};

export default BookCard;
