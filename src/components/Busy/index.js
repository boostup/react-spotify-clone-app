import React from "react";

import { CircularProgress } from "@material-ui/core";

export default function Busy() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.3,
      }}
    >
      <CircularProgress color="secondary" />
    </div>
  );
}
