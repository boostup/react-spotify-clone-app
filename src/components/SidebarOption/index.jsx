import { Link } from "react-router-dom";
import React from "react";

import "./SidebarOption.css";

function SidebarOption({ title, Icon, to }) {
  const className = Icon ? null : "small";

  return (
    <Link title={title} to={to} className={`sidebarOption ${className}`}>
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </Link>
  );
}

export default SidebarOption;
