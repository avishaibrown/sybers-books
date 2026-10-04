import React from "react";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { useTheme, alpha } from "@mui/material/styles";

const FEATURES = [
  {
    icon: <MenuBookOutlinedIcon sx={{ fontSize: 32 }} />,
    title: "100,000+ Rare Books",
    subtitle: "Niche, antiquarian & out-of-print titles",
  },
  {
    icon: <VerifiedOutlinedIcon sx={{ fontSize: 32 }} />,
    title: "Curated Since 1975",
    subtitle: "Woman-owned independent bookshop",
  },
  {
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 32 }} />,
    title: "Worldwide Tracked Delivery",
    subtitle: "Secure & specialized book packaging",
  },
  {
    icon: <PetsOutlinedIcon sx={{ fontSize: 32 }} />,
    title: "Melbourne Storefront",
    subtitle: "Visit our shop & meet our 3 friendly cats",
  },
];

const FeaturesBar = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: "#FCFAF6",
        borderBottom: `1px solid rgba(24, 65, 50, 0.12)`,
        py: { xs: 4, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {FEATURES.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  p: { xs: 1.5, md: 1 },
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 54,
                    height: 54,
                    borderRadius: "12px",
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    color: "secondary.main",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: "primary.main",
                      fontSize: "0.95rem",
                      mb: 0.2,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "0.82rem", lineHeight: 1.4 }}
                  >
                    {item.subtitle}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesBar;
