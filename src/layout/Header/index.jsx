import React from "react";

import { useDataLayerValue } from "../../components/DataLayer";

import SearchField from "../../components/SearchField";
import AvatarArea from "../../components/AvatarArea";

import "./Header.css";

function Header(props) {
  const { state } = useDataLayerValue();
  const { user } = state;

  return (
    <div {...props}>
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
