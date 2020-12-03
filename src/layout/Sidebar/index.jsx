import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAuth } from "_redux/auth/selectors";
import { selectSidebarPlaylists } from "_redux/sidebar/selectors";
import { fetchSidebarDataStart } from "_redux/sidebar/actions";

import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

import SidebarOption from "./SidebarOption";

import "./Sidebar.css";
import SidebarPlaylistsList from "./SidebarPlaylistsList";

import { ReactComponent as Logo } from "assets/spotifLylogo.svg";

function Sidebar({ className }) {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);
  const playlists = useSelector(selectSidebarPlaylists);

  useEffect(() => {
    if (authState.success === true) {
      dispatch(fetchSidebarDataStart());
    }
  }, [dispatch, authState.success]);

  return (
    <div className={className}>
      <Logo />
      <SidebarOption title="Home" Icon={HomeIcon} to="/" />
      <SidebarOption title="Search" Icon={SearchIcon} to="/search" />
      <SidebarOption
        title="Your Library"
        Icon={LibraryMusicIcon}
        to="/library"
      />

      <SidebarPlaylistsList playlists={playlists} />
    </div>
  );
}

export default Sidebar;
