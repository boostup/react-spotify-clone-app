import React from "react";

import SearchIcon from "@material-ui/icons/Search";

import "./SearchField.css";

function SearchField() {
  return (
    <div className="searchField">
      <SearchIcon />
      <input type="text" placeholder="Search for Artists, Songs, Albums" />
    </div>
  );
}

export default SearchField;
