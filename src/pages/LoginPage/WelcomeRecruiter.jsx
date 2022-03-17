import { CopyField } from "components/CopyField";

import Modal from "layout/Modal";
import { useState } from "react";

function WelcomeRecruiter() {
  const [show, toggleShow] = useState(true);

  return (
    <Modal
      when={show}
      buttonLabel={"Ok, got it"}
      onDismiss={() => toggleShow((show) => !show)}
    >
      <div className="welcome-recruiters">
        <p className="title">Dear Visitor,</p>
        <p>&nbsp;</p>
        <p>This app is hooked to Spotify API's.</p>
        <p>&nbsp;</p>
        <p>
          Because each <u>test user must be registered</u>, please use the
          following user:
        </p>
        <p>&nbsp;</p>
        <p>account: </p>
        <p>boostupmagenta@gmail.com</p>
        <CopyToClipboard />
      </div>
    </Modal>
  );
}

export default WelcomeRecruiter;

/** Internal Component */
export const CopyToClipboard = () => {
  const [out, setOut] = useState("");
  return (
    <>
      <p>&nbsp;</p>
      <p className="out">&nbsp;{out}</p>
      <CopyField
        disabled={true}
        copyTooltip="Click to copy the password"
        value={"5NK&Wn_X2@jNJzL"}
        showTextField={false}
        buttonColor="secondary"
        onCopySuccess={() => setOut("Password copied!")}
      />
    </>
  );
};
