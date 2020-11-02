import React from "react";

import "./SidebarOption.css";

function SidebarOption({ title, Icon }) {
  const className = Icon ? null : "small";

  return (
    <div className={`sidebarOption ${className}`}>
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOption;
