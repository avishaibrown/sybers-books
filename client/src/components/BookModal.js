import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  IconButton,
  Tabs,
  Tab,
  Box,
  Grid,
  Typography,
  Chip,
  Divider,
  CircularProgress,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useTheme, alpha } from "@mui/material/styles";
import CartButton from "./CartButton";
import { getBookDetailsData, formatAsCurrency, getBookImageUrl } from "../utils/util";
import { SHOP, SUCCESS } from "../utils/constants";

const BookModal = (props) => {
  const {
    open,
    setOpen,
    book,
    onCartAction,
    loading,
    addToCart,
    missingValuesText,
    modalTabs,
    disabled,
  } = props;

  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const descriptionElementRef = useRef(null);

  const onClose = () => {
    if (!loading) setOpen(false);
  };

  const onTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  useEffect(() => {
    if (open && descriptionElementRef.current !== null) {
      descriptionElementRef.current.focus();
    }
  }, [open]);

  const isSold = disabled || book.STATUS === SUCCESS.soldStatus;
  const imageSrc = getBookImageUrl(book["IMAGE URL"]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      aria-labelledby="book-modal-dialog"
      fullWidth
      maxWidth="md"
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: "16px" },
          backgroundColor: "#FAF7F2",
          overflow: "hidden",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          boxShadow: "0 24px 48px rgba(28, 53, 45, 0.2)",
        },
      }}
    >
      {/* Modal Header */}
      <DialogTitle
        sx={{
          p: { xs: 2.5, md: 3 },
          backgroundColor: "#FFFFFF",
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box sx={{ minWidth: 0, flex: 1 }}>
          {book.CATEGORY && (
            <Chip
              label={book.CATEGORY}
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                color: "secondary.main",
                fontWeight: 600,
                fontSize: "0.72rem",
                mb: 1,
                borderRadius: "4px",
              }}
            />
          )}
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              fontSize: { xs: "1.3rem", md: "1.6rem" },
              color: "primary.main",
              lineHeight: 1.25,
              mb: 0.5,
            }}
          >
            {book.TITLE ? book.TITLE : missingValuesText?.title || "Untitled"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: "0.95rem" }}>
            by {book.AUTHOR ? book.AUTHOR : missingValuesText?.author || "Unknown Author"}
          </Typography>
        </Box>

        <IconButton
          aria-label="close modal"
          onClick={onClose}
          size="small"
          sx={{
            color: "text.secondary",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            borderRadius: "8px",
            "&:hover": {
              color: "primary.main",
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* Modal Content */}
      <DialogContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Left Column: Book Preview Image */}
          <Grid item xs={12} sm={4} md={4.5}>
            <Box
              sx={{
                textAlign: "center",
                p: 2,
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
              }}
            >
              <Box
                component="img"
                src={imageSrc}
                alt={book.TITLE}
                onError={(event) => {
                  event.target.onerror = null;
                  event.target.src = "./images/no-image-found.jpg";
                }}
                sx={{
                  maxWidth: "100%",
                  maxHeight: 320,
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "6px",
                  boxShadow: "0 10px 25px rgba(28, 53, 45, 0.15)",
                }}
              />
              <Box sx={{ mt: 2, pt: 1.5, borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.06)}` }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  Item Serial: {book.SERIAL || "N/A"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    fontSize: "1.3rem",
                    mt: 0.5,
                  }}
                >
                  {book.PRICE ? formatAsCurrency(book.PRICE) : missingValuesText?.price}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Column: Tabs (Details & Description) */}
          <Grid item xs={12} sm={8} md={7.5}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
              <Tabs
                value={tabIndex}
                onChange={onTabChange}
                aria-label="book details tabs"
                textColor="primary"
                indicatorColor="secondary"
              >
                <Tab
                  icon={<AutoStoriesOutlinedIcon fontSize="small" />}
                  iconPosition="start"
                  label={modalTabs?.[0] || "Details"}
                  id="tab-0"
                  sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.9rem" }}
                />
                <Tab
                  icon={<DescriptionOutlinedIcon fontSize="small" />}
                  iconPosition="start"
                  label={modalTabs?.[1] || "Description"}
                  id="tab-1"
                  sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.9rem" }}
                />
              </Tabs>
            </Box>

            {/* Tab 0: Attribute Details Table */}
            {tabIndex === 0 && (
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                  overflow: "hidden",
                }}
              >
                {getBookDetailsData(book).map((row, index) => (
                  <Box
                    key={`modal-book-attr-${index}`}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      py: 1.2,
                      px: 2,
                      borderBottom:
                        index !== getBookDetailsData(book).length - 1
                          ? `1px solid ${alpha(theme.palette.primary.main, 0.05)}`
                          : "none",
                      backgroundColor:
                        index % 2 === 0
                          ? alpha(theme.palette.primary.main, 0.015)
                          : "#FFFFFF",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "text.primary" }}
                    >
                      {row.attribute}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "right", maxWidth: "60%" }}
                    >
                      {row.value || "—"}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* Tab 1: Full Description */}
            {tabIndex === 1 && (
              <Box
                ref={descriptionElementRef}
                tabIndex={-1}
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                  p: 2.5,
                  minHeight: 180,
                  maxHeight: 280,
                  overflowY: "auto",
                }}
              >
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ lineHeight: 1.8, fontSize: "0.95rem", whiteSpace: "pre-line" }}
                >
                  {book.DESCRIPTION || "No detailed description provided for this volume."}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.08) }} />

      {/* Modal Actions */}
      <DialogActions
        sx={{
          p: { xs: 2, md: 2.5 },
          backgroundColor: "#FFFFFF",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", sm: "block" } }}>
          Free pickup in Caulfield South • Worldwide tracked shipping
        </Typography>

        <Box sx={{ ml: "auto" }}>
          {loading ? (
            <CircularProgress size={28} color="secondary" />
          ) : isSold ? (
            <Chip
              label={SHOP.soldText || "Sold / Out of Print"}
              sx={{
                backgroundColor: alpha("#d32f2f", 0.1),
                color: "#d32f2f",
                fontWeight: 700,
                py: 2,
                px: 1,
                fontSize: "0.9rem",
              }}
            />
          ) : (
            <CartButton
              addToCart={addToCart}
              onCartAction={onCartAction}
              book={book}
              isIcon={false}
              price={book.PRICE}
            />
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default BookModal;
