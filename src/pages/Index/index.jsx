import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectHeaderScrolled } from "../../redux/ui/selectors";
import { selectPlaylistTracks } from "../../redux/playlist/selectors";
import { toggleHeaderScrolled } from "../../state/actions";

import uuid from "uuid";
import TrackRow from "../../components/TrackRow";
import "../../components/TrackList/TrackList.css";

function TrackList({ playlist }) {
  return (
    <div className="trackList">
      {/* <pre>{JSON.stringify(items, null, 4)}</pre> */}

      {playlist.map((track, i) => {
        return (
          <TrackRow
            //

            order={i + 1}
            key={uuid()}
            track={track}
          />
        );
      })}
    </div>
  );
}

function areEqual(prevProps, newProps) {
  if (JSON.stringify(prevProps) === JSON.stringify(newProps)) return true;
  return false;
}

const MemoTrackList = memo(TrackList, areEqual);

const Index = (props) => {
  const headerScrolled = useSelector(selectHeaderScrolled);
  const playlist = useSelector(selectPlaylistTracks);
  const dispatch = useDispatch();

  return (
    <div>
      <div>Hello</div>
      <p>{headerScrolled ? "TRUE" : "False"}</p>
      <button onClick={() => dispatch(toggleHeaderScrolled(!headerScrolled))}>
        dispatch
      </button>
      <p></p>
      <button onClick={() => console.clear()}>clear console</button>
      <MemoTrackList playlist={playlist} />
    </div>
  );
};

export default Index;
