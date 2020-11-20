import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleDisplaySearchBar } from "redux/header/actions";
import {
  selectSearchPage,
  selectSearchPageSearchResults,
} from "redux/search-page/selectors";

import MainLayoutPageWrapper from "layout/MainLayoutPageWrapper";
import SectionHeading from "components/SectionHeading";
import PlaylistIcon from "@material-ui/icons/QueueMusic";
import ArtistIcon from "@material-ui/icons/RecordVoiceOver";
import AlbumIcon from "@material-ui/icons/Album";
import ItemsGrid from "components/ItemsGrid";

import "./SearchPage.css";

function SearchPage() {
  const dispatch = useDispatch();
  const pageState = useSelector(selectSearchPage);
  const searchResults = useSelector(selectSearchPageSearchResults);
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
    <MainLayoutPageWrapper
      isLoading={pageState.isFetching}
      //
      title="Search for Albums, Artists and Playlists"
    >
      <div className="searchPage">
        {!searchResults && <h1>Search millions of tracks...</h1>}

        {artists && (
          <>
            <SectionHeading icon={ArtistIcon} title="Artists" />
            <ItemsGrid variant="artist" items={artists} />
          </>
        )}

        {playlists && (
          <>
            <SectionHeading icon={PlaylistIcon} title="Playlists" />
            <ItemsGrid variant="playlist" items={playlists} />
          </>
        )}

        {albums && (
          <>
            <SectionHeading icon={AlbumIcon} title="Albums" />
            <ItemsGrid variant="album" items={albums} />
          </>
        )}
      </div>
    </MainLayoutPageWrapper>
  );
}

export default SearchPage;
