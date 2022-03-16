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
      <div style={{ maxWidth: "615px" }}>
        <p>Dear Recruiter,</p>
        <p>&nbsp;</p>
        <p>This app is hooked to Spotify API's.</p>
        <p>&nbsp;</p>
        <p>
          Because each <u>test user must be registered</u>, please use the
          following registered user:
        </p>
        <p>&nbsp;</p>
        <div
          style={{
            maxWidth: "75%",
            padding: "1rem",
            margin: "0 auto",
            // textAlign: "left",
          }}
        >
          <p>account: </p>
          <p>boostupmagenta@gmail.com</p>
          <p>&nbsp;</p>
          <p>password: </p>
          <p>********* </p>
        </div>
      </div>
    </Modal>
  );
}

export default WelcomeRecruiter;
