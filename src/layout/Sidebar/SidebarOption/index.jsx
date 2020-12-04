import { Link } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";

import { toggleSidebarVisibility } from "_redux/sidebar/actions";

import { Typography } from "@material-ui/core";

import "./SidebarOption.css";

function SidebarOption({ title, Icon, to }) {
  const className = Icon ? null : "small";
  const dispatch = useDispatch();

  return (
    <Link
      title={title}
      to={to}
      className={`sidebarOption ${className}`}
      onClick={() => dispatch(toggleSidebarVisibility(false))}
    >
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        <h4>{title}</h4>
      ) : (
        <Typography noWrap variant="p">
          {title}
        </Typography>
      )}
    </Link>
  );
}

export default SidebarOption;
