import React from "react";

import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";

import { useDataLayerValue } from "../DataLayer";

import "./Header.css";

function Header() {
  const [{ user }, dispatch] = useDataLayerValue();
  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <input type="text" placeholder="Search for Artists, Songs, Albums" />
      </div>
      <div className="header__right">
        {/* NICE TRICK : again-> optional chaining using `?` -> if object is still null when trying to access its properties, at least there won't be a JS error */}
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
