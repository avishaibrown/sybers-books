import React, { useEffect } from "react";
import { Container, Box, Typography, Paper, Stack, Chip } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import { useTheme, alpha } from "@mui/material/styles";
import { SHIPPING_AND_RETURNS } from "../utils/constants";

const ShippingReturns = () => {
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box component="section" sx={{ pb: 10 }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
          py: { xs: 5, md: 7 },
          px: 2,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="caption"
            sx={{
              color: "secondary.main",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              display: "block",
              mb: 1.5,
            }}
          >
            Customer Care & Store Policies
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: { xs: "2.2rem", sm: "3rem" },
              fontWeight: 700,
              color: "primary.main",
              mb: 1.5,
            }}
          >
            {SHIPPING_AND_RETURNS.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Clear guidelines on postage rates, delivery timeframes, and book return procedures.
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ mt: { xs: 4, md: 6 } }}>
        <Stack spacing={3}>
          {/* Shipping Info Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: "16px",
              backgroundColor: "#FFFFFF",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: "8px",
                  backgroundColor: alpha(theme.palette.primary.main, 0.06),
                  color: "primary.main",
                  display: "flex",
                }}
              >
                <LocalShippingOutlinedIcon />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                Shipping & Delivery Rates
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
              Syber's Books ships books anywhere across Australia at flat rates: <strong>$9.99</strong> for standard postage and <strong>$15.99</strong> for express postage. For international destinations, a flat-rate shipping fee of <strong>$39.99 AUD</strong> applies.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="Australia Standard: 6-11 days" size="small" sx={{ borderRadius: "6px" }} />
              <Chip label="Australia Express: 1-5 days" size="small" sx={{ borderRadius: "6px" }} />
              <Chip label="International: 7-21 days" size="small" sx={{ borderRadius: "6px" }} />
            </Stack>
          </Paper>

          {/* Product Returns Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: "16px",
              backgroundColor: "#FFFFFF",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: "8px",
                  backgroundColor: alpha(theme.palette.primary.main, 0.06),
                  color: "primary.main",
                  display: "flex",
                }}
              >
                <AssignmentReturnOutlinedIcon />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                Product Returns & Condition Inquiries
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 1.5 }}>
              Most of our volumes are in as-new condition, but as a specialist 2nd-hand bookshop, gentle wear and tear may sometimes be present. When notable, details are included on each book's description.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              If you have any doubts about the condition of a volume prior to purchase, or if an item received is defective or incorrect, please email us at <strong>{SHIPPING_AND_RETURNS.email}</strong> with your order number and photos. We are happy to issue an immediate refund or exchange.
            </Typography>
          </Paper>

          {/* Return to Sender Card */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: "16px",
              backgroundColor: "#FFFFFF",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: "8px",
                  backgroundColor: alpha(theme.palette.primary.main, 0.06),
                  color: "primary.main",
                  display: "flex",
                }}
              >
                <UndoOutlinedIcon />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                Delivery Address Accuracy
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              Please ensure your delivery details are accurate upon ordering. In the event a parcel is returned to us due to an address error, you can choose either a refund (minus courier freight incurred) or pay replacement postage to have the book redelivered.
            </Typography>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default ShippingReturns;
