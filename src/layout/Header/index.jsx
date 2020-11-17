import React from "react";

import { playItem } from "../../redux/footer/async-actions";

import SearchField from "./SearchField";
import ItemHeaderToolbar from "./ItemHeaderToolbar";
import AvatarArea from "./AvatarArea";

import "./Header.css";

function Header({
  className,
  dispatch,
  useSelector,
  userAvatar,
  userName,
  displaySearchBar,
  displayItemToolbar,
  isItemPage,
  itemName,
  itemURI,
}) {
  const searchBarClassName = () =>
    displaySearchBar ? "showSearchbar" : "hideSearchbar";

  const itemToolbarClassName = () =>
    isItemPage && displayItemToolbar ? "showItemToolbar" : "hideItemToolbar";

  return (
    <div className={`${className}`}>
      <div
        className={`header__left ${searchBarClassName()} ${itemToolbarClassName()} `}
      >
        <SearchField {...{ dispatch, useSelector, displaySearchBar }} />
        <ItemHeaderToolbar title={itemName} onPlay={() => playItem(itemURI)} />
      </div>
      <div className="header__right">
        <AvatarArea {...{ userAvatar, userName }} />
      </div>
    </div>
  );
}

export default Header;
