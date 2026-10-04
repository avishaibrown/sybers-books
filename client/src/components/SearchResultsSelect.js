import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { stringToSlug } from "../utils/util";

const SearchResultsSelect = (props) => {
  const { label, value, onChange, menuItems } = props;
  const theme = useTheme();
  const selectId = stringToSlug(label || "select");

  return (
    <FormControl
      size="small"
      sx={{
        m: 0.8,
        minWidth: { xs: 130, sm: 160 },
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
          fontSize: "0.875rem",
          fontWeight: 500,
          "& fieldset": {
            borderColor: alpha(theme.palette.primary.main, 0.15),
          },
          "&:hover fieldset": {
            borderColor: theme.palette.secondary.main,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.secondary.main,
          },
        },
        "& .MuiInputLabel-root": {
          fontSize: "0.875rem",
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 500,
          "&.Mui-focused": {
            color: theme.palette.secondary.main,
          },
        },
      }}
    >
      <InputLabel id={`${selectId}-label`}>{label}</InputLabel>
      <Select
        labelId={`${selectId}-label`}
        id={selectId}
        value={value}
        onChange={onChange}
        label={label}
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(28, 53, 45, 0.12)",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
              mt: 0.5,
            },
          },
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={`${selectId}-item-${index}`}
            value={item.value}
            sx={{
              fontSize: "0.875rem",
              py: 1,
              "&.Mui-selected": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                fontWeight: 600,
              },
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SearchResultsSelect;
