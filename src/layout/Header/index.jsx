import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAuthUser } from "redux/auth/selectors";
import { logout } from "redux/auth/actions";
import { selectHeader } from "redux/header/selectors";
import {
  toggleDisplayItemToolbar,
  // isPlaylistFollowedByUser,
} from "redux/header/actions";
import { selectItemPage } from "redux/item-page/selectors";
import { playItem } from "redux/footer/async-actions";

import SearchField from "./SearchField";
import ItemHeaderToolbar from "./ItemHeaderToolbar";
import AvatarArea from "./AvatarArea";

import "./Header.css";

function Header({ className, bodyComponentScrollValue }) {
  const dispatch = useDispatch();

  const {
    //
    displayItemToolbar,
    displaySearchBar,
  } = useSelector(selectHeader);

  const { isItemPage, item } = useSelector(selectItemPage);
  const itemName = item?.name;
  const itemURI = item?.uri;

  const user = useSelector(selectAuthUser);
  const userAvatar = user?.images[0]?.url;
  const userName = user?.display_name;

  const menuOptions = [
    { title: "Account", url: process.env.REACT_APP_AVATAR_MENU_ACCOUNT },
    { title: "Profile", url: process.env.REACT_APP_AVATAR_MENU_PROFILE },
    { title: "Logout", fn: () => dispatch(logout()) },
  ];

  const searchBarClassName = () =>
    displaySearchBar ? "showSearchbar" : "hideSearchbar";

  const itemToolbarClassName = () =>
    isItemPage && displayItemToolbar ? "showItemToolbar" : "hideItemToolbar";

  const [isHeaderScroll, setIsHeaderScrolled] = useState(false);

  //Block to display or hide the Header background
  useEffect(() => {
    const shouldDisplayHeaderBackground =
      bodyComponentScrollValue >= 70 ? true : false;
    if (isHeaderScroll !== shouldDisplayHeaderBackground)
      setIsHeaderScrolled(shouldDisplayHeaderBackground);
  }, [bodyComponentScrollValue, isHeaderScroll]);

  //Block to display or hide the ItemToolbar in the Header
  useEffect(() => {
    //ItemBanner component height + ItemToolbar component height = 473px
    const candDisplayItemToolbar =
      isItemPage && bodyComponentScrollValue >= 473 ? true : false;
    if (displayItemToolbar !== candDisplayItemToolbar) {
      dispatch(toggleDisplayItemToolbar(candDisplayItemToolbar));
    }
  }, [dispatch, isItemPage, displayItemToolbar, bodyComponentScrollValue]);

  return (
    <div className={`${className}  ${isHeaderScroll ? "scrolled" : "top"}`}>
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
