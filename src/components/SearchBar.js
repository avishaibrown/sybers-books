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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SEARCH_BAR_PLACEHOLDER } from "../utils/constants";

const SearchBar = (props) => {
  const { label, onSearch, value } = props;
  const [searchValue, setSearchValue] = useState("");
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const onClickHandler = () => {
    searchValue.length >= 3 && onSearch(searchValue);
  };

  const onKeyPressHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onClickHandler();
    }
  };

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
              marginLeft: { xs: -3 },
              minWidth: 800,
              whiteSpace: "normal",
            }}
          >
            {label}
          </InputLabel>
        )}
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            fontSize: { xs: "1rem", md: "1.25rem", lg: "1.5rem" },
            minWidth: { xs: 300, sm: 450, md: 600, lg: 800 },
          }}
          placeholder={SEARCH_BAR_PLACEHOLDER}
          onChange={(event) => setSearchValue(event.target.value)}
          onKeyDown={onKeyPressHandler}
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
          onClick={onClickHandler}
          id={"search-icon"}
        >
          <SearchIcon />
        </IconButton>
      )}
    </Paper>
  );
};

export default SearchBar;
