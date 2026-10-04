import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { resetCartState, markBooksAsSold } from "../slices/cart";
import { resetSearchResultsState } from "../slices/searchResults";
import {
  Container,
  Paper,
  Box,
  Typography,
  Button as MuiButton,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useTheme, alpha } from "@mui/material/styles";
import { SUCCESS } from "../utils/constants";
import { getApiUrl } from "../utils/util";

const TransactionSuccess = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");

  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const theme = useTheme();

  const onTransactionSuccess = useCallback(
    async (bookIds, email, orderNo) => {
      try {
        dispatch(
          markBooksAsSold({
            bookIds: bookIds,
            buyerEmail: email,
            orderNumber: orderNo,
          })
        );
        dispatch(resetCartState());
        dispatch(resetSearchResultsState());
      } catch (error) {
        console.error("Failed to mark books as sold:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("session_id");

    const fetchData = async () => {
      if (!sessionId) {
        return;
      }

      try {
        const response = await fetch(
          `${getApiUrl("/success")}?session_id=${sessionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const json = await response.json();
        if (response.ok) {
          setCustomerName(json.customerName || "Book Lover");
          setCustomerEmail(json.customerEmail || "");
          const orderNum = json.customerReceiptNumber || json.customerOrderNumber || "";
          setReceiptNumber(orderNum);

          const cartBookIds = cart.map((book) => book.SERIAL);
          onTransactionSuccess(cartBookIds, json.customerEmail, orderNum);
        }
      } catch (err) {
        console.error("Error fetching order confirmation:", err);
      }
    };

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, sm: 6 },
          borderRadius: "20px",
          backgroundColor: "#FFFFFF",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          boxShadow: "0 12px 36px rgba(28, 53, 45, 0.08)",
          textAlign: "center",
          maxWidth: 650,
          mx: "auto",
        }}
      >
        {/* Animated Checkmark Circle */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <CheckCircleOutlineRoundedIcon sx={{ fontSize: 46 }} />
        </Box>

        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            color: "primary.main",
            fontSize: { xs: "2rem", md: "2.4rem" },
            mb: 1.5,
          }}
        >
          {customerName ? `Thank You, ${customerName}!` : "Order Confirmed!"}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
          Your order has been successfully placed with Syber's Books. We're preparing your rare
          volumes for secure packing and tracked delivery.
        </Typography>

        {/* Receipt Number Badge */}
        {receiptNumber && (
          <Box sx={{ mb: 3 }}>
            <Chip
              label={`Receipt #: ${receiptNumber}`}
              sx={{
                fontWeight: 700,
                fontSize: "0.9rem",
                py: 2,
                px: 1,
                backgroundColor: alpha(theme.palette.secondary.main, 0.12),
                color: "secondary.main",
                borderRadius: "8px",
              }}
            />
          </Box>
        )}

        <Divider sx={{ my: 3, borderColor: alpha(theme.palette.primary.main, 0.08) }} />

        {/* Confirmation Details Card */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            p: 2.5,
            borderRadius: "12px",
            backgroundColor: alpha(theme.palette.primary.main, 0.03),
            textAlign: "left",
            mb: 4,
          }}
        >
          <MarkEmailReadOutlinedIcon sx={{ color: "primary.main", fontSize: 32 }} />
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "primary.main" }}>
              Confirmation Sent
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
              A full receipt and tracking details have been sent to{" "}
              <strong>{customerEmail || "your email"}</strong>. (Please allow up to 30 mins).
            </Typography>
          </Box>
        </Stack>

        {/* CTA Return Button */}
        <MuiButton
          component={RouterLink}
          to="/"
          variant="contained"
          size="large"
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            px: 4,
            py: 1.4,
            borderRadius: "10px",
            fontWeight: 700,
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.light",
            },
          }}
        >
          {SUCCESS.redirectLinkText || "Return to Home"}
        </MuiButton>
      </Paper>
    </Container>
  );
};

export default TransactionSuccess;
