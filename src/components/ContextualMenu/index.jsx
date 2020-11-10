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

  const handlClick = (url) => {
    if (isExternalResource(url)) {
      window.location = url;
    } else {
      onClose();
      history.push(url);
    }
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
        {menuOptions.map(({ title, url }) => {
          return (
            <MenuItem key={url} onClick={() => handlClick(url)}>
              {title}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
