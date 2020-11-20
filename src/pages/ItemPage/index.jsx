import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { selectAuth } from ".redux/auth/selectors";
import { selectItemPage } from "redux/item-page/selectors";

import {
  toggleDisplayItemToolbar,
  // isPlaylistFollowedByUser,
} from "redux/header/actions";

import {
  fetchItemPageDataStart,
  toggleIsItemPage,
} from "redux/item-page/actions";

import { addToQueue, playItem } from "redux/footer/async-actions";

import MainLayoutPageWrapper from "layout/MainLayoutPageWrapper";
import ItemBanner from "components/ItemBanner";
import ItemToolbar from "components/ItemToolbar";
import TrackList from "components/TrackList";

/**
 * Is understood by Item :
 *  Album or Playlist
 *
 * The values for `variant` are :
 *   "album" or "playlist"
 *
 * Same applies for ItemsGrid, ItemBanner, TrackList
 */
function ItemPage({
  match: {
    params: { id, variant },
  },
}) {
  const dispatch = useDispatch();
  // const {
  //   // user,
  // } = useSelector(selectAuth);

  const pageState = useSelector(selectItemPage);
  const { item } = pageState;
  const tracks = item?.items || [];
  const pageTitle = item?.name;

  useEffect(() => {
    dispatch(toggleIsItemPage(true));
    dispatch(fetchItemPageDataStart({ id, variant }));

    //Cleaning up
    return () => {
      dispatch(toggleDisplayItemToolbar(false));
      dispatch(toggleIsItemPage(false));
    };
  }, [dispatch, id, variant]);

  return (
    <MainLayoutPageWrapper
      //
      title={pageTitle}
      isLoading={pageState.isFetching}
    >
      <div className="itemPage">
        <ItemBanner item={item} variant={variant} tracks={tracks} />

        <ItemToolbar
          onQueue={() => addToQueue(tracks[0]?.uri)}
          onPlay={() => playItem(item?.uri)}
        />
        <TrackList firstLarge={false} items={tracks} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default ItemPage;
