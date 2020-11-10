import React, { useEffect, useRef, useState } from "react";

import { spotifyAPI, hydrateSpotifyApi } from "../../../libs/spotify";

import SearchIcon from "@material-ui/icons/Search";

import "./SearchField.css";
import useDebounce from "../../../hooks/useDebounce";
import { actionTypes } from "../../../state/actionTypes";
import { useDataLayerValue } from "../../../state/DataLayer";

const filters = {
  ARTIST: "artist",
  ALBUM: "album",
  PLAYLIST: "playlist",
};

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

  const [searchFilter] = useState(filters.ARTIST);

  useEffect(
    () => {
      debouncedSearchTerm &&
        spotifyAPI
          //
          .search(debouncedSearchTerm, ["artist"])
          .catch((error) => {
            console.log(error);
            hydrateSpotifyApi(error, dispatch);
          })
          .then((results) => {
            dispatch({
              type: actionTypes.SET_SEARCH_RESULTS,
              payload: results,
            });
            dispatch({
              type: actionTypes.SET_SEARCH_FILTER,
              payload: searchFilter,
            });
          });
    },
    [dispatch, searchFilter, debouncedSearchTerm] // Only call effect if debounced search term changes
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
