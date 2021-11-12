import React, { useContext } from "react";
import styles from "./style.module.css";
import translate from "../../localization/translate";
import PasswordFlow from "./password";
import PasswordLessFlow from "./passwordless";
import { CommonDataContext } from "../../providers/CommonDataContext";

const Login = (props) => {
  const {
    onChange,
    switchLogin,
    onSubmit,
    LoginError,
    LoginForm,
    hideEmail,
    onToggle,
    validateEmail,
    getOtp,
    LoginText,
    otpValid,
    setOtpValid,
    trackClickEvent,
    handleForgotPasswordClick,
  } = props;
  const { utagData } = useContext(CommonDataContext);

  return (
    <div className={styles.LoginWrapperContainer}>
      <form className={styles.LoginInputWrapper}>
        {switchLogin === "login-with-password" && (
          <PasswordFlow
            onChange={onChange}
            LoginError={LoginError}
            LoginForm={LoginForm}
            validateEmail={validateEmail}
            onSubmit={onSubmit}
            trackClickEvent={trackClickEvent}
            LoginText={LoginText}
            handleForgotPasswordClick={handleForgotPasswordClick}
          />
        )}

        {switchLogin === "login-with-otp" && (
          <PasswordLessFlow
            onChange={onChange}
            LoginError={LoginError}
            LoginForm={LoginForm}
            validateEmail={validateEmail}
            getOtp={getOtp}
            hideEmail={hideEmail}
            onSubmit={onSubmit}
            trackClickEvent={trackClickEvent}
            LoginText={LoginText}
            otpValid={otpValid}
            setOtpValid={setOtpValid}
          />
        )}
      </form>

      <div className={styles.SwitchContainer}>
        <div className={styles.Switch}>
          <div className={styles.Horizontaldashedline}></div>
          <div className={styles.ordiv}>{translate("or")}</div>
          <div className={styles.Horizontaldashedline}></div>
        </div>

        {switchLogin === "login-with-password" && (
          <>
            <button className={styles.SwitchBtn} onClick={onToggle}>
              <div id="Sigin-With-OTP">
                {translate("Sign_in_with_a_onetime_passcode")}
              </div>
            </button>
            <div className={styles.otpinfo}>
              {translate("we_will_send_otp")}
            </div>
          </>
        )}
        {switchLogin === "login-with-otp" && (
          <button className={styles.SwitchBtn} onClick={onToggle}>
            <div>{translate("signIn_with_password")}</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
