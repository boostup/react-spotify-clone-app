import React, { useEffect, useState } from "react";
import { Grow, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import {
    selectFooterError,
} from "_redux/footer/selectors";
import { selectAuthUser } from "_redux/auth/selectors";
import { cleanRemoteControlApiError } from "_redux/footer/actions";

const useStyles = makeStyles(() => ({
    spotifyRemoteControlError: {
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
    }
}))

function RemoteControlError() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(selectAuthUser);
    const remoteControlError = useSelector(selectFooterError);
    const [displayError, setDisplayError] = useState(remoteControlError !== null);


    useEffect(() => {
        setDisplayError(remoteControlError);
    }, [remoteControlError]);

    return (
        <Grow in={displayError}>
            <div className={classes.spotifyRemoteControlError}>
                {user?.product === "premium" && (
                    <p>
                        {remoteControlError?.message}.&nbsp;
              Please start playing music on your spotify account for this remote
              control to work.
                    </p>
                )}
                {user?.product !== "premium" && (
                    <p>{remoteControlError?.message}</p>
                )}
                <button
                    className="spotifyButton"
                    onClick={() => {
                        setDisplayError(false)
                        setTimeout(() => dispatch(cleanRemoteControlApiError()), 500)
                    }}
                >
                    dismiss
          </button>
            </div>
        </Grow>
    )
}

export default RemoteControlError
