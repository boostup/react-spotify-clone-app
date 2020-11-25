import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAuthUser } from "redux/auth/selectors";
import {
  selectItem,
  selectItemPage,
  selectItemTracks,
} from "redux/item-page/selectors";

import {
  toggleDisplayItemToolbar,
  // isPlaylistFollowedByUser,
} from "redux/header/actions";

import {
  fetchItemPageDataStart,
  toggleIsItemPage,
} from "redux/item-page/actions";

import { playItem } from "redux/footer/async-actions";

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
  const user = useSelector(selectAuthUser);
  const pageState = useSelector(selectItemPage);
  const item = useSelector(selectItem);
  const tracksObj = useSelector(selectItemTracks);
  const tracks = tracksObj?.items || [];
  const pageTitle = item?.name;
  const isItemOwner =
    user?.display_name === item?.owner?.display_name ? true : false;

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
          displayHeart={isItemOwner}
          onPlay={() => playItem(item?.uri, dispatch)}
        />
        <TrackList firstLarge={false} items={tracks} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default ItemPage;
