import React, { useEffect } from "react";

import { useDataLayerValue } from "../../state/DataLayer";
import {
  getAlbumAsync,
  getPlaylistAsync,
  playItem,
  toggleIsItemPage,
  toggleDisplayItemToolbar,
  addToQueue,
  // isPlaylistFollowedByUser,
} from "../../state/actions";

import MainLayoutPageWrapper from "../MainLayoutPageWrapper";
import ItemBanner from "../../components/ItemBanner";
import ItemToolbar from "../../components/ItemToolbar";
import TrackList from "../../components/TrackList";

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
  const { state, dispatch } = useDataLayerValue();
  const {
    // user,
    token,
    item,
  } = state;

  const pageTitle = item?.name;

  const getTracks = {
    album: (_item) => _item?.tracks.items.map((i) => i),
    playlist: (_item) => _item?.tracks.items.map((i) => i.track),
  };

  const fetchItem = (type) => {
    const get = {
      album: getAlbumAsync,
      playlist: getPlaylistAsync,
    };
    return get[type];
  };

  const tracks = getTracks[variant](item) || [];

  useEffect(() => {
    dispatch(toggleIsItemPage(true));
    fetchItem(variant)(id, dispatch);

    //Cleaning up
    return () => {
      dispatch(toggleDisplayItemToolbar(false));
      dispatch(toggleIsItemPage(false));
    };
  }, [id, variant, dispatch, token]);

  return (
    <MainLayoutPageWrapper title={pageTitle}>
      <div className="itemPage">
        <ItemBanner item={item} variant={variant} tracks={tracks} />

        <ItemToolbar
          onQueue={() => addToQueue(tracks[0].uri)}
          onPlay={() => playItem(item.uri)}
        />
        <TrackList firstLarge={false} items={tracks} />
      </div>
    </MainLayoutPageWrapper>
  );
}

export default ItemPage;
