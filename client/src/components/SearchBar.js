import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  InputBase,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { useTheme, alpha } from "@mui/material/styles";

const SearchBar = (props) => {
  const { placeholder, onSearch, value } = props;
  const [searchValue, setSearchValue] = useState("");
  const loading = useSelector((state) => state.searchResults.loading);
  const theme = useTheme();

  useEffect(() => {
    setSearchValue(value || "");
  }, [value]);

  const handleSearch = () => {
    if (searchValue.trim().length >= 2) {
      onSearch(searchValue.trim());
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };

  const placeholderText =
    typeof placeholder === "object"
      ? placeholder.long || placeholder.short
      : placeholder || "Search by title, author, genre, or ISBN...";

  return (
    <Paper
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 720,
        mx: "auto",
        p: { xs: "6px 10px", md: "8px 14px" },
        borderRadius: "14px",
        backgroundColor: "#FFFFFF",
        border: `1.5px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        boxShadow: "0 4px 20px rgba(28, 53, 45, 0.06)",
        transition: "all 0.25s ease",
        "&:hover": {
          borderColor: theme.palette.secondary.main,
          boxShadow: "0 6px 24px rgba(28, 53, 45, 0.1)",
        },
        "&:focus-within": {
          borderColor: theme.palette.secondary.main,
          boxShadow: `0 0 0 3px ${alpha(theme.palette.secondary.main, 0.15)}`,
        },
      }}
    >
      <SearchIcon
        sx={{
          color: "text.secondary",
          mr: 1.5,
          fontSize: { xs: 22, md: 26 },
        }}
      />
      <InputBase
        sx={{
          flex: 1,
          fontSize: { xs: "0.95rem", md: "1.1rem" },
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          color: "text.primary",
        }}
        placeholder={placeholderText}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        id="shop-search-bar"
        inputProps={{ "aria-label": "search books" }}
      />
      {searchValue && (
        <IconButton
          size="small"
          onClick={handleClear}
          aria-label="clear search"
          sx={{ mr: 0.5, color: "text.secondary" }}
        >
          <ClearRoundedIcon fontSize="small" />
        </IconButton>
      )}
      {loading ? (
        <Box sx={{ display: "flex", p: 0.8 }}>
          <CircularProgress size={22} color="secondary" />
        </Box>
      ) : (
        <IconButton
          type="submit"
          aria-label="search"
          sx={{
            backgroundColor: "primary.main",
            color: "#FFFFFF",
            p: { xs: 1, md: 1.2 },
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "primary.light",
            },
          }}
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      )}
    </Paper>
  );
};

export default SearchBar;
