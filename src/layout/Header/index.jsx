import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAuthUser } from "redux/auth/selectors";
import { logout } from "redux/auth/actions";
import {
  toggleHeaderClick,
  // isPlaylistFollowedByUser,
} from "redux/header/actions";
import { playItem } from "redux/footer/async-actions";

import { useDisplayHeaderBackground } from "./hooks/useDisplayHeaderBackground";
import { useDisplayItemToolbar } from "./hooks/useDisplayItemToolbar";
import { useDisplaySearchBar } from "./hooks/useDisplaySearchBar";

import SearchField from "./SearchField";
import ItemHeaderToolbar from "./ItemHeaderToolbar";
import AvatarArea from "./AvatarArea";

import "./Header.css";

function Header({ className, bodyComponentScrollValue }) {
  const dispatch = useDispatch();

  const menuOptions = [
    { title: "Account", url: process.env.REACT_APP_AVATAR_MENU_ACCOUNT },
    { title: "Profile", url: process.env.REACT_APP_AVATAR_MENU_PROFILE },
    { title: "Logout", fn: () => dispatch(logout()) },
  ];

  const user = useSelector(selectAuthUser);
  const userAvatar = user?.images[0]?.url;
  const userName = user?.display_name;

  const isHeaderScrolled = useDisplayHeaderBackground(bodyComponentScrollValue);
  const [itemName, itemURI, itemToolbarClassName] = useDisplayItemToolbar(
    bodyComponentScrollValue
  );
  const [displaySearchBar, searchBarClassName] = useDisplaySearchBar();

  return (
    <div
      className={`${className}  ${isHeaderScrolled ? "scrolled" : "top"}`}
      onClick={() => dispatch(toggleHeaderClick())}
    >
      <div
        className={`header__left ${searchBarClassName()} ${itemToolbarClassName()} `}
      >
        <SearchField {...{ dispatch, useSelector, displaySearchBar }} />
        <ItemHeaderToolbar
          title={itemName}
          onPlay={() => playItem(itemURI, dispatch)}
        />
      </div>
      <div className="header__right">
        <AvatarArea {...{ userAvatar, userName, menuOptions }} />
      </div>
    </div>
  );
}

export default Header;
