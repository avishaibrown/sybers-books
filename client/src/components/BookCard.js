import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BookModal from "./BookModal";
import CartButton from "./CartButton";
import { truncateString, formatAsCurrency } from "../utils/util";
import { SUCCESS } from "../utils/constants";
import { useTheme, alpha } from "@mui/material/styles";

const BookCard = (props) => {
  const {
    book,
    onCartAction,
    loading,
    addToCart,
    missingValuesText,
    modalTabs,
    disabled,
  } = props;

  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();

  const isSold = disabled || book.STATUS === SUCCESS.soldStatus;
  const imageSrc =
    book["IMAGE URL"] && book["IMAGE URL"].trim() !== ""
      ? book["IMAGE URL"]
      : "./images/no-image-found.jpg";

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          height: { xs: 210, sm: 230, md: 240 },
          borderRadius: "14px",
          backgroundColor: "#FFFFFF",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
          overflow: "hidden",
          position: "relative",
          transition: "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "0 2px 12px rgba(28, 53, 45, 0.04)",
          opacity: isSold ? 0.72 : 1,
          "&:hover": {
            transform: isSold ? "none" : "translateY(-4px)",
            boxShadow: isSold
              ? "0 2px 12px rgba(28, 53, 45, 0.04)"
              : "0 14px 28px -4px rgba(28, 53, 45, 0.12)",
            borderColor: isSold
              ? alpha(theme.palette.primary.main, 0.08)
              : alpha(theme.palette.secondary.main, 0.4),
            "& .quick-view-overlay": {
              opacity: 1,
            },
          },
        }}
      >
        {/* Book Cover Container */}
        <Box
          sx={{
            width: { xs: 110, sm: 130, md: 140 },
            minWidth: { xs: 110, sm: 130, md: 140 },
            height: "100%",
            position: "relative",
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
            cursor: "pointer",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setOpenModal(true)}
        >
          <CardMedia
            component="img"
            image={imageSrc}
            alt={book.TITLE || "Book Cover"}
            onError={(event) => {
              event.target.onerror = null;
              event.target.src = "./images/no-image-found.jpg";
            }}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />

          {/* Quick View Hover Hint */}
          <Box
            className="quick-view-overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(28, 53, 45, 0.6)",
              backdropFilter: "blur(2px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.25s ease",
              color: "#FFFFFF",
            }}
          >
            <VisibilityOutlinedIcon fontSize="small" sx={{ mb: 0.5 }} />
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: "0.72rem" }}>
              Details
            </Typography>
          </Box>
        </Box>

        {/* Book Details Container */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            p: { xs: 1.8, md: 2.2 },
            minWidth: 0,
            justifyContent: "space-between",
          }}
        >
          {/* Card Header: Category Chip + Title + Author */}
          <Box onClick={() => setOpenModal(true)} sx={{ cursor: "pointer" }}>
            {book.CATEGORY && (
              <Chip
                label={truncateString(book.CATEGORY, 22, true)}
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  color: "secondary.main",
                  mb: 1,
                  borderRadius: "4px",
                }}
              />
            )}

            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                fontWeight: 700,
                color: "text.primary",
                lineHeight: 1.3,
                mb: 0.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                transition: "color 0.2s ease",
                "&:hover": {
                  color: "secondary.main",
                },
              }}
            >
              {book.TITLE ? book.TITLE : missingValuesText?.title || "Untitled"}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.82rem",
                fontWeight: 500,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {book.AUTHOR ? book.AUTHOR : missingValuesText?.author || "Unknown Author"}
            </Typography>
          </Box>

          {/* Card Footer: Price & Cart Action */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pt: 1,
              borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.06)}`,
            }}
          >
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", fontSize: "0.7rem", lineHeight: 1 }}
              >
                Price
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                  fontSize: { xs: "1.05rem", md: "1.15rem" },
                }}
              >
                {book.PRICE
                  ? formatAsCurrency(book.PRICE)
                  : missingValuesText?.price || "—"}
              </Typography>
            </Box>

            {isSold ? (
              <Chip
                label={SUCCESS.soldStatus || "Sold"}
                size="small"
                sx={{
                  backgroundColor: alpha("#d32f2f", 0.1),
                  color: "#d32f2f",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  borderRadius: "6px",
                }}
              />
            ) : (
              <CartButton
                addToCart={addToCart}
                onCartAction={onCartAction}
                book={book}
                isIcon={true}
              />
            )}
          </Box>
        </Box>
      </Card>

      {/* Book Details Modal */}
      <BookModal
        open={openModal}
        setOpen={setOpenModal}
        book={book}
        onCartAction={onCartAction}
        loading={loading}
        addToCart={addToCart}
        missingValuesText={missingValuesText}
        modalTabs={modalTabs}
        disabled={isSold}
      />
    </Grid>
  );
};

export default BookCard;
