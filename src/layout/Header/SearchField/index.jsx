import React, { useEffect, useRef, useState } from "react";

import { spotifyAPI, hydrateSpotifyApi } from "../../../libs/spotify";

import SearchIcon from "@material-ui/icons/Search";

import "./SearchField.css";
import useDebounce from "../../../hooks/useDebounce";
import { useDataLayerValue } from "../../../state/DataLayer";
import { setSearchResults } from "../../../state/actions";

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
      debouncedSearchTerm &&
        spotifyAPI
          //
          .search(debouncedSearchTerm, ["artist", "album", "playlist"])
          .catch((error) => {
            // console.log(error);
            hydrateSpotifyApi(error, dispatch);
          })
          .then((results) => {
            dispatch(setSearchResults(results));
          });
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
