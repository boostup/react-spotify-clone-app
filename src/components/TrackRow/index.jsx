import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToMySavedTracks } from "_redux/home-page/async-actions";
import { addToQueue } from "_redux/footer/async-actions";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import QueueIcon from "@material-ui/icons/Queue";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import RadioIcon from "@material-ui/icons/Radio";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { Typography } from "@material-ui/core";

import Artists from "../Artists";
import Duration from "../Duration";
import ImageFader from "../ImageLoader";
import HeartToggle from "../HeartToggle";

import ContextualMenu from "../ContextualMenu";

import "./TrackRow.css";

function TrackRow({ order, track, large = true, onPlay }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className={`trackRow ${large ? "large" : ""}`}
      onClick={() => onPlay(track.uri)}
    >
      <span className="trackRow__order">{order}</span>

      {track?.album && (
        <ImageFader
          className="trackRow__album"
          src={track?.album.images[large ? 0 : 1].url}
          alt={track?.name}
        />
      )}

      <div className="trackRow__info">
        <Typography variant="h3" noWrap>
          <span className="trackRow__info__duration">
            <Duration ms={track?.duration_ms} />
          </span>{" "}
          <span>{track?.name}</span>
        </Typography>
        <Typography noWrap>
          {track.explicit && (
            <span title="Explicit" className="trackRow__explicit">
              e
            </span>
          )}
          {track?.artists && <Artists items={track.artists} />}
          {track?.album && <> • {track.album.name}</>}
        </Typography>
      </div>

      <div className="trackRow__toolbar">
        <HeartToggle
          status={false}
          onToggle={() => {
            // console.log("toggled!!!!!!!!!!!!!!!!!!!!!");
          }}
        />
        <MoreHorizIcon className="trackRow__more" onClick={handleClick} />
      </div>

      <ContextualMenu
        menuId="track-menu"
        menuOptions={[
          {
            icon: FavoriteIcon,
            title: "add to saved tracks",
            fn: () => addToMySavedTracks(track.id),
          },
          {
            icon: PlaylistAddIcon,
            title: "add to playlist... (in construction)",
            fn: () => {},
          },
          {
            icon: QueueIcon,
            title: "add to queue",
            fn: () => addToQueue(track.uri, dispatch),
          },
          {
            icon: RadioIcon,
            title: "go to radio...",
            fn: () =>
              history.push(
                `/featured/${track.id}/${encodeURIComponent(track.name)}`
              ),
          },
          {
            icon: ShareIcon,
            title: "copy link (in construction)",
            fn: () => {},
          },
        ]}
        anchorEl={anchorEl}
        onClose={handleClose}
      />
    </div>
  );
}

export default TrackRow;
