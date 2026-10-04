import * as React from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  IconButton,
  Link,
  Typography,
  Divider,
} from "@mui/material";
import { Facebook, AdminPanelSettingsOutlined } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useTheme, alpha } from "@mui/material/styles";
import { stringToSlug } from "../utils/util";

const Footer = (props) => {
  const {
    image,
    imageAlt,
    navigateTo,
    copyright,
    socialLink,
    privacy,
    terms,
    shipping,
    adminOnly,
  } = props;

  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#EFE5D3",
        borderTop: `1px solid rgba(24, 65, 50, 0.12)`,
        pt: { xs: 6, md: 8 },
        pb: 4,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} justifyContent="space-between">
          {/* Brand & Store Information */}
          <Grid item xs={12} md={5}>
            <Box
              component={RouterLink}
              to={navigateTo}
              sx={{
                display: "inline-block",
                mb: 2,
                transition: "opacity 0.2s ease",
                "&:hover": { opacity: 0.85 },
              }}
            >
              <Box
                component="img"
                alt={imageAlt}
                src={image}
                sx={{
                  maxHeight: 38,
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 380, mb: 2.5, lineHeight: 1.7 }}
            >
              Melbourne's home for rare, out-of-print, and collectible second-hand books.
              Dedicated to passionate book lovers and curious collectors since 1975.
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                href={socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Facebook page"
                size="small"
                sx={{
                  color: "primary.main",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                  borderRadius: "8px",
                  p: 1,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton
                component={RouterLink}
                to={adminOnly?.link || "/auth"}
                aria-label={stringToSlug(adminOnly?.title || "admin")}
                size="small"
                sx={{
                  color: "text.secondary",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  borderRadius: "8px",
                  p: 1,
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                <AdminPanelSettingsOutlined fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick Links / Policies */}
          <Grid item xs={6} sm={4} md={3}>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 700,
                color: "primary.main",
                letterSpacing: "0.06em",
                mb: 2,
              }}
            >
              Customer Care
            </Typography>
            <Stack spacing={1.2}>
              <Link
                component={RouterLink}
                to={shipping.link}
                underline="none"
                color="text.secondary"
                sx={{
                  fontSize: "0.9rem",
                  transition: "color 0.2s ease, transform 0.2s ease",
                  "&:hover": {
                    color: "secondary.main",
                    transform: "translateX(2px)",
                  },
                }}
              >
                {shipping.title}
              </Link>
              <Link
                component={RouterLink}
                to={privacy.link}
                underline="none"
                color="text.secondary"
                sx={{
                  fontSize: "0.9rem",
                  transition: "color 0.2s ease, transform 0.2s ease",
                  "&:hover": {
                    color: "secondary.main",
                    transform: "translateX(2px)",
                  },
                }}
              >
                {privacy.title}
              </Link>
              <Link
                component={RouterLink}
                to={terms.link}
                underline="none"
                color="text.secondary"
                sx={{
                  fontSize: "0.9rem",
                  transition: "color 0.2s ease, transform 0.2s ease",
                  "&:hover": {
                    color: "secondary.main",
                    transform: "translateX(2px)",
                  },
                }}
              >
                {terms.title}
              </Link>
            </Stack>
          </Grid>

          {/* Location & Contact Info */}
          <Grid item xs={6} sm={4} md={3}>
            <Typography
              variant="subtitle2"
              sx={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 700,
                color: "primary.main",
                letterSpacing: "0.06em",
                mb: 2,
              }}
            >
              Store Location
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              666 Glenhuntly Road
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Caulfield South, VIC 3162
            </Typography>
            <Link
              component={RouterLink}
              to="/contact"
              underline="none"
              color="secondary.main"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 600,
                display: "inline-block",
                mt: 1,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Get Directions & Hours →
            </Link>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: { xs: 4, md: 5 },
            borderColor: alpha(theme.palette.primary.main, 0.08),
          }}
        />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.82rem" }}>
            {copyright} {new Date().getFullYear()} Syber's Books. All rights reserved.
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.8rem" }}
          >
            Crafted for Rare & Collectible Book Lovers
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
