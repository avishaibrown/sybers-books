import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  InputBase,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SEARCH_BAR_PLACEHOLDER } from "../utils/constants";

const SearchBar = (props) => {
  const { onSearch, value } = props;
  const [searchValue, setSearchValue] = useState("");
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const onClickHandler = () => {
    searchValue.length >= 3 && onSearch(searchValue);
  };

  return (
    <Paper
      component="form"
      sx={{
        py: { xs: 1, lg: 2 },
        px: 2,
        display: "flex",
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          fontSize: { xs: "1rem", md: "1.5rem", lg: "2rem" },
          minWidth: { xs: 300, sm: 450, md: 600, lg: 800 },
        }}
        placeholder={SEARCH_BAR_PLACEHOLDER}
        onChange={(e) => setSearchValue(e.target.value)}
        autoFocus={true}
        fullWidth={true}
        value={searchValue}
        disabled={loading}
        id={"search-bar"}
      />
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
