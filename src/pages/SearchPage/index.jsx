import React, { useEffect, useState } from "react";

import { actionTypes } from "../../state/actionTypes";

import MainLayoutPageWrapper from "../MainLayoutPageWrapper";
import { useDataLayerValue } from "../../state/DataLayer";
import SearchResultsGrid from "../../components/SearchResultsGrid";

import "./SearchPage.css";

const resultKeys = {
  artist: "artists",
  album: "albums",
  playlist: "playlists",
};

function SearchPage() {
  const { state, dispatch } = useDataLayerValue();

  useEffect(() => {
    dispatch({ type: actionTypes.SET_SEARCH_BAR_DISPLAY, payload: true });
    //Cleaning up
    return () => {
      dispatch({ type: actionTypes.SET_SEARCH_BAR_DISPLAY, payload: false });
    };
  }, [dispatch]);

  const { searchFilter, searchResults } = state;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const filterKey = resultKeys[searchFilter];
    //Once API results are in state, get the items dynamically according to the value of filterKey (searchResults["artists" | "playlists" | "albums"])
    if (filterKey && searchResults) {
      setItems(searchResults[filterKey].items);
    }
  }, [searchFilter, searchResults]);

  return (
    <MainLayoutPageWrapper title="Your Library">
      <div className="searchPage">
        {!items && <h1>Search millions of tracks...</h1>}

        <SearchResultsGrid
          itemTypes={resultKeys}
          itemType={`${searchFilter}s`}
          items={items}
        />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default SearchPage;
