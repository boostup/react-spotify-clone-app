import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectAuthUser } from "_redux/auth/selectors";
import {
  selectItem,
  selectItemPage,
  selectItemTracks,
} from "_redux/item-page/selectors";

import {
  toggleDisplayItemToolbar,
} from "_redux/header/actions";

import { toggleItemHeartStart } from "_redux/events/actions";

import {
  fetchItemPageDataStart,
  toggleIsItemPage,
} from "_redux/item-page/actions";

import { playItem } from "_redux/footer/async-actions";

import MainLayoutPageWrapper from "layout/MainLayoutPageWrapper";
import ItemBanner from "./ItemBanner";
import ItemToolbar from "./ItemToolbar";
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
function ItemPage() {
  let { id, variant } = useParams();
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
          heartStatus={item?.is_favorite}
          onHeartToggleClick={() => {
            dispatch(toggleItemHeartStart(id, variant, item.is_favorite))
          }}
          onPlay={() => playItem(item?.uri, dispatch)}
        />
        <TrackList firstLarge={false} items={tracks} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default ItemPage;
