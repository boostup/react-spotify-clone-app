import React from "react";

import { useDataLayerValue } from "../DataLayer";

import SearchField from "../SearchField";
import AvatarArea from "../AvatarArea";

import "./Header.css";

function Header() {
  const { state } = useDataLayerValue();
  const { user } = state;

  return (
    <div className="header">
      <div className="header__left">
        <SearchField />
      </div>
      <div className="header__right">
        <AvatarArea user={user} />
      </div>
    </div>
  );
}

export default Header;
