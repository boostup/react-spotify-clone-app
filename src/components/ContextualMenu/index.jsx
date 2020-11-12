import React from "react";

import { useHistory } from "react-router-dom";
import { isExternalResource } from "../../utils/http";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./ContextualMenu.css";

export default function ContextualMenu({
  menuId,
  menuOptions,
  anchorEl,
  onClose,
}) {
  const history = useHistory();

  const handleUrl = (url) => {
    if (isExternalResource(url)) {
      window.location = url;
    } else {
      onClose();
      history.push(url);
    }
  };

  const handleClick = (url, fn) => {
    // When a menu item is clicked, it can either be a function to invoke
    if (fn instanceof Function) return fn();
    // or a link/location
    handleUrl(url);
  };

  return (
    <div className="contextualMenu">
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        {menuOptions.map(({ title, url, fn }) => {
          return (
            <MenuItem key={title} onClick={() => handleClick(url, fn)}>
              {title}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
