import React, { useEffect } from "react";

import MainLayoutPageWrapper from "../MainLayoutPageWrapper";
import { useDataLayerValue } from "../../state/DataLayer";
import ArtistsGrid from "../../components/ArtistsGrid";

import "./SearchPage.css";
import { toggleDisplaySearchBar } from "../../state/actions";
import PlaylistsGrid from "../../components/PlaylistsGrid";

function SearchPage() {
  const { state, dispatch } = useDataLayerValue();
  const { searchResults } = state;
  const artists = searchResults?.artists?.items;
  const albums = searchResults?.albums?.items;
  const playlists = searchResults?.playlists?.items;

  useEffect(() => {
    dispatch(toggleDisplaySearchBar(true));

    //Cleaning up
    return () => {
      //This timer allows to give time for the CSS transition to hide the search bar
      setTimeout(() => dispatch(toggleDisplaySearchBar(false)), 100);
    };
  }, [dispatch]);

  return (
    <MainLayoutPageWrapper title="Your Library">
      <div className="searchPage">
        {!searchResults && <h1>Search millions of tracks...</h1>}

        {playlists && (
          <>
            <h1>Playlists</h1>
            <PlaylistsGrid items={playlists} />
          </>
        )}

        {artists && (
          <>
            <h1>Artists</h1>
            <ArtistsGrid items={artists} />
          </>
        )}

        {albums && (
          <>
            <h1>Albums</h1>
            <PlaylistsGrid items={albums} />
          </>
        )}
      </div>
    </MainLayoutPageWrapper>
  );
}

export default SearchPage;
