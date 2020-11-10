import React from "react";

import { useDataLayerValue } from "../../state/DataLayer";

import SearchField from "./SearchField";
import AvatarArea from "./AvatarArea";

import "./Header.css";

function Header(props) {
  const { className } = props;
  const { state } = useDataLayerValue();
  const { user, displaySearchBar } = state;

  const conditionalClassName = () => (displaySearchBar ? "show" : "hide");

  return (
    <div className={`${className}`}>
      <div className={`header__left ${conditionalClassName()} `}>
        <SearchField />
      </div>
      <div className="header__right">
        <AvatarArea user={user} />
      </div>
    </div>
  );
}

export default Header;
