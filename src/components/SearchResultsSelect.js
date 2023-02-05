import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { stringToSlug } from "../utils/util";

const SearchResultsSelect = (props) => {
  const { label, value, onChange, menuItems } = props;

  return (
    <FormControl sx={{ m: 1, minWidth: 160 }} size="large">
      <InputLabel id={stringToSlug(label) + "select-label"}>{label}</InputLabel>
      <Select
        labelId={stringToSlug(label) + "select-label"}
        id={stringToSlug(label) + "select"}
        value={value}
        defaultValue={menuItems[0].value}
        onChange={onChange}
        label={label}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={"select-menu-item-" + index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SearchResultsSelect;
