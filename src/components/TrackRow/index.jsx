import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { addToMySavedTracks, addToQueue } from "../../state/actions";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import QueueIcon from "@material-ui/icons/Queue";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import RadioIcon from "@material-ui/icons/Radio";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Artists from "../Artists";
import Duration from "../Duration";
import ImageFader from "../ImageFader";
import HeartToggle from "../HeartToggle";

import ContextualMenu from "../ContextualMenu";

import "./TrackRow.css";

function TrackRow({ order, track, large = true, onPlay }) {
  const history = useHistory();
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
      onClick={() => onPlay(track.id)}
    >
      <span className="trackRow__order">{order}</span>
      <ImageFader
        containerClass="trackRow__album"
        src={track?.album.images[large ? 0 : 1].url}
      />
      <div className="trackRow__info">
        <span className="trackRow__info__duration">
          <Duration ms={track.duration_ms} />
        </span>{" "}
        <h1>{track.name}</h1>
        <p>
          {track.explicit && (
            <span title="Explicit" className="trackRow__explicit">
              e
            </span>
          )}
          <Artists items={track.artists} /> • {track.album.name}
        </p>
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
            icon: QueueIcon,
            title: "add to queue",
            fn: () => addToQueue(track.uri),
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
            icon: PlaylistAddIcon,
            title: "add to playlist... (in construction)",
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
