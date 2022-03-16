import React, { useEffect, useState } from "react";
import { Grow, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  modal: {
    position: "fixed",
    zIndex: 11,
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.8)",
    fontSize: "2rem",
    textAlign: "center",
    padding: "1rem",
  },
}));

function Modal({ when, buttonLabel, onDismiss, children }) {
  const classes = useStyles();
  const [displayMsg, toggleDisplayMsg] = useState(when);

  const handleClick = () => {
    onDismiss();
    toggleDisplayMsg(false);
  };

  useEffect(() => {
    toggleDisplayMsg(when);
  }, [when]);

  return (
    <Grow in={displayMsg}>
      <div className={classes.modal}>
        {children}
        <button className="spotifyButton" onClick={handleClick}>
          {buttonLabel ? buttonLabel : "dismiss"}
        </button>
      </div>
    </Grow>
  );
}

export default Modal;
