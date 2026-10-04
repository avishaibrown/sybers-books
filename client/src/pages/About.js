import React, { useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Paper,
  Stack,
  Chip,
  Button as MuiButton,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import { Link as RouterLink } from "react-router-dom";
import { useTheme, alpha } from "@mui/material/styles";
import { ABOUT } from "../utils/constants";

const STATS = [
  { icon: <MenuBookOutlinedIcon />, label: "Curated Volumes", value: "200,000+" },
  { icon: <HistoryEduOutlinedIcon />, label: "Years in Caulfield", value: "48+ Years" },
  { icon: <PetsOutlinedIcon />, label: "Feline Residents", value: "3 Resident Cats" },
  { icon: <FavoriteBorderOutlinedIcon />, label: "Woman-Owned", value: "100% Independent" },
];

const About = () => {
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box component="section" sx={{ pb: 10 }}>
      {/* 1. Editorial Header Banner */}
      <Box
        sx={{
          backgroundColor: "#FCFAF6",
          borderBottom: `1px solid rgba(24, 65, 50, 0.12)`,
          py: { xs: 6, md: 9 },
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
            Melbourne's Literary Sanctuary
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: { xs: "2.4rem", sm: "3.2rem", md: "3.8rem" },
              fontWeight: 700,
              color: "primary.main",
              mb: 2.5,
              lineHeight: 1.2,
            }}
          >
            Where rare finds meet passionate book lovers.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: { xs: "1.05rem", md: "1.2rem" }, maxWidth: 680, mx: "auto", lineHeight: 1.7 }}
          >
            For almost half a century, Syber's Books has been a treasure trove for collectors,
            academics, and curious readers seeking the unusual and the out-of-print.
          </Typography>
        </Container>
      </Box>

      {/* 2. Key Stats Strip */}
      <Box
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.03),
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.06)}`,
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            {STATS.map((stat, idx) => (
              <Grid item xs={6} md={3} key={idx}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    textAlign: "center",
                    borderRadius: "14px",
                    backgroundColor: "#FFFFFF",
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                    boxShadow: "0 4px 14px rgba(28, 53, 45, 0.04)",
                  }}
                >
                  <Box sx={{ color: "secondary.main", mb: 1, display: "flex", justifyContent: "center" }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main", mb: 0.5 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 3. Alternating Story Panels */}
      <Container maxWidth="lg" sx={{ mt: { xs: 6, md: 10 } }}>
        <Stack spacing={{ xs: 8, md: 12 }}>
          {/* Panel 1: Store & Collection */}
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 16px 36px rgba(28, 53, 45, 0.12)",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Box
                  component="img"
                  src={ABOUT.images[0]}
                  alt="Syber's Books Storefront"
                  sx={{ width: "100%", height: "auto", display: "block" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Chip
                label="The Collection"
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  color: "secondary.main",
                  fontWeight: 600,
                  mb: 1.5,
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  color: "primary.main",
                  fontSize: { xs: "1.8rem", md: "2.3rem" },
                  mb: 2.5,
                }}
              >
                Over 200,000 Rare & Unique Titles
              </Typography>
              {ABOUT.descriptionPanelOne.map((p, idx) => (
                <Typography key={idx} variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.75 }}>
                  {p}
                </Typography>
              ))}
            </Grid>
          </Grid>

          {/* Panel 2: The Bookstore Cats */}
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>
            <Grid item xs={12} md={6}>
              <Chip
                label="Meet Our Residents"
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  color: "secondary.main",
                  fontWeight: 600,
                  mb: 1.5,
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  color: "primary.main",
                  fontSize: { xs: "1.8rem", md: "2.3rem" },
                  mb: 2.5,
                }}
              >
                The Feline Guardians of the Shelves
              </Typography>
              {ABOUT.descriptionPanelTwo.map((p, idx) => (
                <Typography key={idx} variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.75 }}>
                  {p}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 16px 36px rgba(28, 53, 45, 0.12)",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Box
                  component="img"
                  src={ABOUT.images[1]}
                  alt="Bookstore cat relaxing among rare books"
                  sx={{ width: "100%", height: "auto", display: "block" }}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Panel 3: Penny & Her Passion */}
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 16px 36px rgba(28, 53, 45, 0.12)",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Box
                  component="img"
                  src={ABOUT.images[2]}
                  alt="Penny Merrit, owner of Syber's Books"
                  sx={{ width: "100%", height: "auto", display: "block" }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Chip
                label="Woman-Owned Independent"
                size="small"
                sx={{
                  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  color: "secondary.main",
                  fontWeight: 600,
                  mb: 1.5,
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontWeight: 700,
                  color: "primary.main",
                  fontSize: { xs: "1.8rem", md: "2.3rem" },
                  mb: 2.5,
                }}
              >
                Personal Touch & Lifelong Dedication
              </Typography>
              {ABOUT.descriptionPanelThree.map((p, idx) => (
                <Typography key={idx} variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.75 }}>
                  {p}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Stack>

        {/* 4. Bottom Callout Card */}
        <Paper
          elevation={0}
          sx={{
            mt: { xs: 8, md: 12 },
            p: { xs: 4, md: 6 },
            borderRadius: "20px",
            backgroundColor: "#FFFFFF",
            border: `1.5px solid ${alpha(theme.palette.secondary.main, 0.25)}`,
            boxShadow: "0 12px 36px rgba(28, 53, 45, 0.06)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              color: "primary.main",
              mb: 1.5,
            }}
          >
            Discover Your Next Favorite Book
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 560, mx: "auto", mb: 3.5, lineHeight: 1.7 }}>
            All transactions are in Australian dollars (AUD). We accept Mastercard, Visa, Amex, and PayPal with tracked delivery worldwide.
          </Typography>
          <MuiButton
            component={RouterLink}
            to="/shop"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              px: 4.5,
              py: 1.5,
              borderRadius: "10px",
              backgroundColor: "primary.main",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
          >
            Browse Full Online Catalog
          </MuiButton>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
