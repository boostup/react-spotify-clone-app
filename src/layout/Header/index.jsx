import React from "react";

import { useDataLayerValue } from "../../state/DataLayer";
import { playItem } from "../../state/actions";

import SearchField from "./SearchField";
import ItemHeaderToolbar from "./ItemHeaderToolbar";
import AvatarArea from "./AvatarArea";

import "./Header.css";

function Header(props) {
  const { className } = props;
  const { state } = useDataLayerValue();
  const {
    user,
    displaySearchBar,
    isItemPage,
    displayItemToolbar,
    item,
  } = state;

  const searchBarClassName = () =>
    displaySearchBar ? "showSearchbar" : "hideSearchbar";

  const itemToolbarClassName = () =>
    isItemPage && displayItemToolbar ? "showItemToolbar" : "hideItemToolbar";

  return (
    <div className={`${className}`}>
      <div
        className={`header__left ${searchBarClassName()} ${itemToolbarClassName()} `}
      >
        <SearchField />
        <ItemHeaderToolbar
          title={item?.name}
          onPlay={() => playItem(item?.uri)}
        />
      </div>
      <div className="header__right">
        <AvatarArea user={user} />
      </div>
    </div>
  );
}

export default Header;
