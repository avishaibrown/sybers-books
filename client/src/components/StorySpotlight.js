import React from "react";
import { Box, Container, Grid, Typography, Stack, Button as MuiButton } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";
import { useTheme, alpha } from "@mui/material/styles";

const StorySpotlight = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: alpha(theme.palette.primary.main, 0.03),
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.06)}`,
        borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.06)}`,
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 20px 40px -10px rgba(28, 53, 45, 0.15)",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <Box
                component="img"
                src="./images/about-store-front.png"
                alt="Syber's Books storefront in Melbourne"
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transition: "transform 0.5s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  right: 16,
                  p: 2,
                  backgroundColor: "rgba(28, 53, 45, 0.88)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#D4A373" }}>
                  Visit Our Melbourne Store
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "0.82rem", opacity: 0.9 }}>
                  666 Glenhuntly Rd, Caulfield South VIC
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              variant="caption"
              sx={{
                color: "secondary.main",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                display: "block",
                mb: 1,
              }}
            >
              Our Story & Heritage
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.6rem" },
                fontWeight: 700,
                color: "primary.main",
                mb: 2.5,
              }}
            >
              More than a bookstore — a sanctuary for book lovers.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2, lineHeight: 1.7 }}
            >
              For decades, Syber's Books has stood as a cherished Melbourne institution.
              As an independent, woman-owned bookstore housing over 200,000 carefully curated
              titles, we specialize in the unusual, the obscure, and the impossible-to-find.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.7 }}
            >
              Whether you're hunting down an out-of-print 19th-century volume or stopping by
              to say hello to our three beloved bookstore cats, we look forward to welcoming you.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <MuiButton
                variant="contained"
                onClick={() => navigate("/about")}
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  px: 3.5,
                  py: 1.3,
                  backgroundColor: "primary.main",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                }}
              >
                Read Our Story
              </MuiButton>
              <MuiButton
                variant="outlined"
                onClick={() => navigate("/contact")}
                sx={{
                  px: 3.5,
                  py: 1.3,
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  color: "primary.main",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                Store Hours & Contact
              </MuiButton>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StorySpotlight;
