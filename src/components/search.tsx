import searchContext from "../contexts";
import { TextField } from "@mui/material";
import { useState, useCallback, useContext } from "react";
import { SearchContextType } from "../utility/interface";

const Search = () => {
  const store = useContext<SearchContextType | null>(searchContext);
  const setSearchTerm = store?.setSearchTerm;
  const [inputValue, setInputValue] = useState<string>("");

  // handle input changes
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      const searchTerm = event.target.value;
      const delayDebounceFn = setTimeout(() => {
        setSearchTerm?.(searchTerm);
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    },
    [setInputValue, setSearchTerm]
  );
  return (
    <TextField
      variant="outlined"
      label="Search"
      value={inputValue}
      onChange={handleInputChange}
      fullWidth
      sx={{ mb: 5 }}
    />
  );
};

export default Search;
