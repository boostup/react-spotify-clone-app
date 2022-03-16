import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectFooterError } from "_redux/footer/selectors";
import { selectAuthUser } from "_redux/auth/selectors";
import { cleanRemoteControlApiError } from "_redux/footer/actions";
import Modal from "layout/Modal/Modal";

function RemoteControlError() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const remoteControlError = useSelector(selectFooterError);

  const buttonFunction = () => {
    setTimeout(() => dispatch(cleanRemoteControlApiError()), 500);
  };

  return (
    <Modal when={remoteControlError !== null} onDismiss={buttonFunction}>
      {user?.product === "premium" && (
        <p>
          {remoteControlError?.message}.&nbsp; For this remote control to work,
          please start playing music from any other device, using the test
          account.
        </p>
      )}
      {user?.product !== "premium" && <p>{remoteControlError?.message}</p>}
    </Modal>
  );
}

export default RemoteControlError;
