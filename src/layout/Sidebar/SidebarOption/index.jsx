import { Link } from "react-router-dom";
import React from "react";

import "./SidebarOption.css";
import { Typography } from "@material-ui/core";

function SidebarOption({ title, Icon, to }) {
  const className = Icon ? null : "small";

  return (
    <Link title={title} to={to} className={`sidebarOption ${className}`}>
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
