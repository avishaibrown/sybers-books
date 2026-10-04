import React, { useState, useMemo } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  InputBase,
  Button as MuiButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import { useTheme, alpha } from "@mui/material/styles";

const INITIAL_COUNT = 16;

const CategoriesList = (props) => {
  const { categories, title, onCategorySearch } = props;
  const [filterText, setFilterText] = useState("");
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const filteredCategories = useMemo(() => {
    if (!filterText.trim()) return categories;
    return categories.filter((cat) =>
      cat.toLowerCase().includes(filterText.toLowerCase().trim())
    );
  }, [categories, filterText]);

  const displayedCategories = useMemo(() => {
    if (filterText.trim() || expanded) return filteredCategories;
    return filteredCategories.slice(0, INITIAL_COUNT);
  }, [filteredCategories, expanded, filterText]);

  return (
    <Container
      maxWidth="lg"
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Section Header */}
      <Box sx={{ textAlign: "center", mb: { xs: 5, md: 6 } }}>
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
          Curated Catalog
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "2rem", md: "2.8rem" },
            fontWeight: 700,
            color: "primary.main",
            mb: 2,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
        >
          Explore over 80 distinctive departments covering rare antiquarian volumes,
          obscure historical records, niche fiction, and first editions.
        </Typography>

        {/* Live Category Filter Input */}
        <Paper
          elevation={0}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            width: "100%",
            maxWidth: 440,
            px: 2,
            py: 0.8,
            borderRadius: "30px",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.16)}`,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
          }}
        >
          <SearchIcon sx={{ color: "text.secondary", mr: 1, fontSize: 20 }} />
          <InputBase
            placeholder="Quick filter categories..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            fullWidth
            sx={{
              fontSize: "0.92rem",
              fontFamily: '"Plus Jakarta Sans", sans-serif',
            }}
            inputProps={{ "aria-label": "filter categories" }}
          />
          {filterText && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ cursor: "pointer", ml: 1 }}
              onClick={() => setFilterText("")}
            >
              Clear
            </Typography>
          )}
        </Paper>
      </Box>

      {/* Category Cards Grid */}
      <Grid container spacing={2.5}>
        {displayedCategories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper
              elevation={0}
              onClick={() => onCategorySearch(category)}
              sx={{
                p: 2.2,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#FFFFFF",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                cursor: "pointer",
                transition: "all 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  borderColor: theme.palette.secondary.main,
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 24px -4px rgba(28, 53, 45, 0.08)",
                  "& .category-icon": {
                    color: "secondary.main",
                    backgroundColor: alpha(theme.palette.secondary.main, 0.12),
                  },
                  "& .arrow-icon": {
                    color: "secondary.main",
                    transform: "translateX(3px)",
                  },
                  "& .category-title": {
                    color: "primary.main",
                  },
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
                <Box
                  className="category-icon"
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }}
                >
                  <AutoStoriesIcon sx={{ fontSize: 18 }} />
                </Box>
                <Typography
                  className="category-title"
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    fontSize: "0.93rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {category}
                </Typography>
              </Box>

              <ArrowForwardIosRoundedIcon
                className="arrow-icon"
                sx={{
                  fontSize: 13,
                  color: "text.secondary",
                  flexShrink: 0,
                  ml: 1,
                  transition: "all 0.2s ease",
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* No categories found fallback */}
      {displayedCategories.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="body1" color="text.secondary">
            No categories matching "<strong>{filterText}</strong>".
          </Typography>
        </Box>
      )}

      {/* Expand / Collapse Button */}
      {!filterText && categories.length > INITIAL_COUNT && (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <MuiButton
            variant="outlined"
            onClick={() => setExpanded(!expanded)}
            endIcon={
              expanded ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />
            }
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: "30px",
              borderColor: alpha(theme.palette.primary.main, 0.25),
              color: "primary.main",
              fontWeight: 600,
              fontSize: "0.95rem",
              "&:hover": {
                borderColor: "primary.main",
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
              },
            }}
          >
            {expanded
              ? "Show Fewer Categories"
              : `View All Categories (${categories.length})`}
          </MuiButton>
        </Box>
      )}
    </Container>
  );
};

export default CategoriesList;
