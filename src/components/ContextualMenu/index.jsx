import React from "react";

import { useHistory } from "react-router-dom";
import { isExternalResource } from "utils/http";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./ContextualMenu.css";

import { withStyles } from "@material-ui/core";

const StyledMenu = withStyles({
  paper: {
    border: "var(--chrome-main-color)",
    backgroundColor: "var(--chrome-main-color)",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default function ContextualMenu({
  menuId,
  menuOptions,
  anchorEl,
  onClose,
}) {
  const history = useHistory();

  const handleUrl = (url) => {
    if (isExternalResource(url)) {
      window.open(url, "_newtab");
    } else {
      onClose();
      history.push(url);
    }
  };

  const handleClick = (event, url, fn) => {
    event.stopPropagation();
    // When a menu item is clicked, it can either be a function to invoke
    if (fn instanceof Function) {
      handleClose(event);
      return fn();
    }
    // or a link/location
    handleUrl(url);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <div className="contextualMenu">
      <StyledMenu
        id={menuId}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuOptions.map(({ icon: IconComponent, title, url, fn }) => {
          return (
            <MenuItem
              key={title}
              onClick={(event) => handleClick(event, url, fn)}
            >
              {IconComponent && (
                <>
                  <ListItemIcon>
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </>
              )}
              {!IconComponent && title}
            </MenuItem>
          );
        })}
      </StyledMenu>
    </div>
  );
}
