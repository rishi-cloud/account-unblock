import React from "react";

import PasswordFlow from "../password";
import styles from "../style.module.css";

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
      </div>
    </div>
  );
}

export default OtpBlockScreen;
