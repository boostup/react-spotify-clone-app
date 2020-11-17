import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAuth } from "../../redux/auth/selectors";
import { selectItemPage } from "../../redux/item-page/selectors";

import {
  toggleDisplayItemToolbar,
  // isPlaylistFollowedByUser,
} from "../../redux/header/actions";

import { toggleIsItemPage } from "../../redux/item-page/actions";

import {
  getAlbumAsync,
  getPlaylistAsync,
} from "../../redux/item-page/async-actions";

import { addToQueue, playItem } from "../../redux/footer/async-actions";

import MainLayoutPageWrapper from "../../layout/MainLayoutPageWrapper";
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
  const dispatch = useDispatch();
  const { user, token } = useSelector(selectAuth);

  const { item } = useSelector(selectItemPage);

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
    <MainLayoutPageWrapper
      //
      title={pageTitle}
      {...{ dispatch, useSelector }}
    >
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
