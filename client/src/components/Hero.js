import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Paper,
  InputBase,
  IconButton,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import Button from "./Button";
import HeroLayout from "./HeroLayout";

const POPULAR_QUICK_TAGS = [
  "Antiquarian",
  "First Editions",
  "Occult & Mythology",
  "Art & Design",
  "History",
  "Philosophy",
];

const Hero = (props) => {
  const { title, description, image, buttonText, onButtonClick, onSearch } = props;
  const [query, setQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length > 0 && onSearch) {
      onSearch(query.trim());
    } else if (onButtonClick) {
      onButtonClick();
    }
  };

  const handleQuickTag = (tag) => {
    if (onSearch) {
      onSearch(tag);
    }
  };

  // Join titles nicely or render with literary accent
  const mainTitle = Array.isArray(title) ? title.join(" ") : title;

  return (
    <HeroLayout
      sxBackground={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Badge / Kicker */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 0.6,
          mb: 3,
          borderRadius: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <AutoStoriesOutlinedIcon sx={{ fontSize: "0.95rem", color: "#D4A373" }} />
        <Typography
          variant="caption"
          sx={{
            color: "#FAF7F2",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
          }}
        >
          Melbourne's Premier Rare & Antiquarian Bookshop
        </Typography>
      </Box>

      {/* Main Headline */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2.4rem", sm: "3.5rem", md: "4.2rem" },
          fontWeight: 700,
          color: "#FFFFFF",
          maxWidth: 900,
          mb: 2.5,
          textShadow: "0 2px 14px rgba(0,0,0,0.35)",
        }}
      >
        {mainTitle}
      </Typography>

      {/* Subtitle / Description */}
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "1.05rem", sm: "1.2rem", md: "1.3rem" },
          color: "rgba(255, 255, 255, 0.88)",
          maxWidth: 720,
          mb: 4.5,
          lineHeight: 1.6,
          fontWeight: 400,
        }}
      >
        {Array.isArray(description) ? description.join(" ") : description}
      </Typography>

      {/* Hero Quick Search Bar */}
      <Paper
        component="form"
        onSubmit={handleSearchSubmit}
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: 620,
          borderRadius: "12px",
          p: "6px 8px 6px 18px",
          backgroundColor: "#FAF7F2",
          border: "2px solid rgba(212, 163, 115, 0.4)",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.35)",
          mb: 3,
        }}
      >
        <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
        <InputBase
          placeholder="Search by title, author, keyword, or ISBN..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          sx={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: { xs: "0.95rem", sm: "1.05rem" },
            color: "text.primary",
          }}
          inputProps={{ "aria-label": "search books" }}
        />
        <IconButton
          type="submit"
          aria-label="submit search"
          sx={{
            backgroundColor: "primary.main",
            color: "#FFFFFF",
            p: 1.2,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "primary.light",
            },
          }}
        >
          <ArrowForwardRoundedIcon fontSize="small" />
        </IconButton>
      </Paper>

      {/* Quick Filter Chips */}
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        justifyContent="center"
        useFlexGap
        sx={{ mb: 4, maxWidth: 680 }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "rgba(255,255,255,0.7)",
            alignSelf: "center",
            mr: 0.5,
            fontWeight: 500,
          }}
        >
          Popular:
        </Typography>
        {POPULAR_QUICK_TAGS.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            onClick={() => handleQuickTag(tag)}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              color: "#FAF7F2",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              fontSize: "0.78rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "secondary.main",
                borderColor: "secondary.main",
                transform: "translateY(-1px)",
              },
            }}
          />
        ))}
      </Stack>

      {/* Primary Action Button */}
      <Button
        variant="contained"
        size="large"
        onClick={onButtonClick}
        sx={{
          minWidth: 220,
          py: 1.5,
          px: 4,
          fontSize: "1.05rem",
          backgroundColor: "secondary.main",
          "&:hover": {
            backgroundColor: "secondary.dark",
          },
        }}
      >
        {buttonText}
      </Button>
    </HeroLayout>
  );
};

export default Hero;
