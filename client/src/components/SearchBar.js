import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  InputBase,
  IconButton,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props) => {
  const { label, placeholder, onSearch, value } = props;
  const [searchValue, setSearchValue] = useState("");
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const onClick = () => {
    searchValue.length >= 3 && onSearch(searchValue);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onClick();
    }
  };

  const labelToDisplay = useMediaQuery((theme) => theme.breakpoints.down("md"))
    ? label.short
    : label.long;

  const placeholderToDisplay = useMediaQuery((theme) =>
    theme.breakpoints.down("md")
  )
    ? placeholder.short
    : placeholder.long;

  return (
    <Paper
      component="form"
      sx={{
        mt: 20,
        py: { xs: 1, lg: 2 },
        px: 2,
        display: "flex",
      }}
    >
      <FormControl>
        {label && (
          <InputLabel
            sx={{
              fontSize: { xs: 20, sm: 24 },
              marginTop: { xs: -3, sm: -4, lg: -5 },
              marginLeft: { xs: -3, sm: -1, md: 0 },
              minWidth: 250,
              whiteSpace: "normal",
            }}
            shrink={true}
          >
            {labelToDisplay}
          </InputLabel>
        )}
        <InputBase
          sx={{
            ml: { xs: 0, md: 1 },
            flex: 1,
            fontSize: { xs: "1rem", md: "1.25rem", lg: "1.5rem" },
            minWidth: { xs: 250, sm: 450, md: 600, lg: 800 },
          }}
          placeholder={placeholderToDisplay}
          onChange={(event) => setSearchValue(event.target.value)}
          onKeyDown={onKeyPress}
          autoFocus
          fullWidth
          value={searchValue}
          disabled={loading}
          id={"search-bar"}
          inputProps={{ "aria-label": "search-bar" }}
        />
      </FormControl>
      {loading ? (
        <Box sx={{ display: "flex", p: 1 }}>
          <CircularProgress size={25} />
        </Box>
      ) : (
        <IconButton
          type="button"
          sx={{
            p: 1,
            transform: { xs: "scale(1)", md: "scale(2)" },
            display: "flex",
          }}
          onClick={onClick}
          id={"search-icon"}
        >
          <SearchIcon />
        </IconButton>
      )}
    </Paper>
  );
};

export default SearchBar;
