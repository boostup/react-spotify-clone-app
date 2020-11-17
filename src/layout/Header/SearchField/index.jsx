import React, { useEffect, useRef, useState } from "react";

import SearchIcon from "@material-ui/icons/Search";

import useDebounce from "../../../hooks/useDebounce";
import { useDataLayerValue } from "../../../state/DataLayer";
import { searchSpotifyAsync } from "../../../state/actions";

import "./SearchField.css";

function SearchField() {
  const searchInputRef = useRef(null);
  const { state, dispatch } = useDataLayerValue();
  const { displaySearchBar } = state;

  useEffect(() => {
    if (displaySearchBar) searchInputRef.current.focus();
  }, [displaySearchBar]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => setSearchTerm(e.target.value);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      debouncedSearchTerm && searchSpotifyAsync(debouncedSearchTerm, dispatch);
    },
    [dispatch, debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <div className="searchField">
      <SearchIcon />
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search for Artists, Albums and Playlists"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchField;
