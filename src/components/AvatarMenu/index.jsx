import React from "react";

import { useHistory } from "react-router-dom";

import { useDataLayerValue } from "../DataLayer";
import { isExternalResource } from "../../utils/http";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function AvatarMenu({ anchorEl, onClose }) {
  const { state } = useDataLayerValue();
  const { avatarMenu } = state;
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
    <div>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        {avatarMenu.map(({ title, url }) => {
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
