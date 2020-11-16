import React from "react";

import "./SectionHeading.css";

function SectionHeading({ icon: IconComponent, title }) {
  return (
    <h1 className="sectionHeading">
      {IconComponent && <IconComponent className="sectionHeading__icon" />}{" "}
      {title}
    </h1>
  );
}

export default SectionHeading;
