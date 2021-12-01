import React from "react";

import PasswordFlow from "../password";
import styles from "../style.module.css";
import translate from "../../../localization/translate";

function OtpBlockScreen(props) {
  const {
    onChange,
    LoginError,
    LoginForm,
    validateEmail,
    onSubmit,
    trackClickEvent,
    LoginText,
    handleForgotPasswordClick,
    blockScreenState,
    blockScreenToggle,
  } = props;

  return (
    <div className={styles.LoginRightWrapper}>
      <div className={styles.LoginWrapperContainer}>
        <form className={styles.LoginInputWrapper}>
          <PasswordFlow
            onChange={onChange}
            LoginError={LoginError}
            LoginForm={LoginForm}
            validateEmail={validateEmail}
            onSubmit={onSubmit}
            trackClickEvent={trackClickEvent}
            LoginText={LoginText}
            handleForgotPasswordClick={handleForgotPasswordClick}
            blockScreenState={blockScreenState}
          />
        </form>
        <div className={styles.SwitchContainer}>
          <div className={styles.Switch}>
            <div className={styles.Horizontaldashedline}></div>
            <div className={styles.ordiv}>{translate("or")}</div>
            <div className={styles.Horizontaldashedline}></div>
          </div>
          <>
            <button
              className={styles.SwitchBtn}
              onClick={(e) => blockScreenToggle("with-otp-user-unlocked", e)}
              data-navelement="Sigin-With-OTP"
            >
              {translate("Sign_in_with_a_onetime_passcode")}
            </button>
            <div className={styles.otpinfo}>
              {translate("we_will_send_otp")}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

export default OtpBlockScreen;
