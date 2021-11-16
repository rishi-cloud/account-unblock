import React from "react";
import translate from "../../../localization/translate";
import styles from "../style.module.css";

function PasswordBlockScreen(props) {
  const { blockScreenToggle } = props;
  return (
    <div className={styles.LoginRightWrapper}>
      <div className={styles.BlockUserDiv}>
        <button
          className={styles.EmailBlockSwitchBtn}
          onClick={() => blockScreenToggle("with-otp")}
          id="Sigin-With-OTP"
        >
          {translate("Sign_in_with_a_onetime_passcode")}
        </button>
        <div className={styles.blockotpinfo}>
          {translate("we_will_send_otp")}
        </div>

        <div className={styles.Horizontaldashedline}></div>

        <div
          className={styles.Signuppagelink}
          onClick={() => blockScreenToggle("with-password")}
          id="Signin-redirect-from-blockscreen"
        >
          {translate("Sign_in_with_a_different_email_address")}
        </div>
      </div>
    </div>
  );
}

export default PasswordBlockScreen;
