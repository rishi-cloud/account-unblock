import React, { useState } from "react";
import styles from "./style.module.css";
import translate from "../../localization/translate";
import { ReactComponent as OutlineMail } from "../../svg/mailIcon.svg";
import { ReactComponent as LockOutline } from "../../svg/lockIcon.svg";
import { ReactComponent as TickIcon } from "../../svg/tickIcon.svg";
import { ReactComponent as FillEye } from "../../svg/eyeIcon.svg";
import { ReactComponent as PasswordCross } from "../../svg/errorCross.svg";
import { FormattedMessage } from "react-intl";

const PasswordFlow = (props) => {
  const {
    onChange,
    LoginError,
    LoginForm,
    validateEmail,
    onSubmit,
    LoginText,
    handleForgotPasswordClick,
    // blockScreenState,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={styles.LoginInputContainer}>
          {LoginForm.email !== "" ? (
            <div
              className={styles.LoginInputLabel}
              style={{
                color:
                  !validateEmail(LoginForm.email) ||
                  (LoginError?.errorCode &&
                    LoginError?.errorCode !== "login.password_lock" &&
                    LoginError?.errorCode !== "passwordless.passcode_lock")
                    ? "#FF3838"
                    : "#0CA77D",
              }}
            >
              {translate("email")}
            </div>
          ) : null}
          <div
            style={{
              flex: 1,
              display: "flex",
              border:
                LoginError?.isEmailError === true ||
                (LoginError?.errorCode &&
                  LoginError?.errorCode !== "login.password_lock" &&
                  LoginError?.errorCode !== "passwordless.passcode_lock")
                  ? "1px solid #FF3838"
                  : validateEmail(LoginForm.email)
                  ? "1px solid #0CA77D"
                  : "1px solid #848faa",
              backgroundColor: "#ffff",
              borderRadius: "1rem",
            }}
          >
            <OutlineMail
              className={styles.LoginInputLogo}
              style={{
                color: validateEmail(LoginForm.email) ? "green" : "",
              }}
            />
            <FormattedMessage id="email">
              {(msg) => (
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={LoginForm.email}
                  placeholder={msg}
                  className={styles.LoginInput}
                  onChange={onChange}
                />
              )}
            </FormattedMessage>

            {validateEmail(LoginForm.email) &&
            LoginText.title === "Looks_like_you_already_have_an_account" ? (
              <TickIcon
                style={{
                  height: "2rem",
                  width: "2rem",
                  marginTop: "0.8rem",
                  marginRight: "0.2rem",
                }}
              />
            ) : null}
            {LoginError?.errorCode &&
              LoginError?.errorCode !== "login.password_lock" &&
              LoginError?.errorCode !== "passwordless.passcode_lock" && (
                <PasswordCross className={styles.cancel} />
              )}
          </div>
        </div>
      </div>
      {LoginError?.email && (
        <div className={styles.Error}>{translate(LoginError?.email)}</div>
      )}
      <>
        <div
          className={styles.LoginInputContainerPassword}
          style={{
            border:
              LoginError?.errorCode &&
              LoginError?.errorCode !== "login.password_lock" &&
              LoginError?.errorCode !== "passwordless.passcode_lock"
                ? "1px solid #FF3838"
                : "1px solid #848faa",
          }}
        >
          {LoginForm.password !== "" ? (
            <div
              className={styles.LoginInputLabel}
              style={{
                color:
                  LoginError?.errorCode &&
                  LoginError?.errorCode !== "login.password_lock" &&
                  LoginError?.errorCode !== "passwordless.passcode_lock"
                    ? "#FF3838"
                    : "",
              }}
            >
              {translate("password")}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              borderRadius: "1rem",
              backgroundColor: "#ffff",
            }}
          >
            <LockOutline className={styles.LoginInputLogo} />
            <FormattedMessage id="password">
              {(msg) => (
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder={msg}
                  className={styles.LoginInput}
                  onChange={onChange}
                />
              )}
            </FormattedMessage>

            <FillEye
              style={{
                height: "2rem",
                width: "2rem",
                marginTop: "0.8rem",
                marginRight: "0.5rem",
                color: "rgb(175, 174, 174)",
                cursor: "pointer",
              }}
              onClick={() => {
                showPassword ? setShowPassword(false) : setShowPassword(true);
              }}
              data-nav-element-click="show-password"
            />
            {LoginError?.errorCode &&
              LoginError?.errorCode !== "login.password_lock" &&
              LoginError?.errorCode !== "passwordless.passcode_lock" && (
                <PasswordCross className={styles.cancel} />
              )}
          </div>
        </div>
        <div className={styles.forgotPasswordContainer}>
          <button
            type="button"
            className={styles.forgotPassword}
            onClick={handleForgotPasswordClick}
            data-navelement="Forgot Password"
          >
            {translate("Forgot_password")}
          </button>
        </div>
      </>
      <button
        className={styles.SigninWithPassword}
        onClick={(e) => {
          onSubmit(e);
        }}
        disabled={
          !validateEmail(LoginForm.email) ||
          LoginForm.password === "" ||
          LoginForm.isSubmitting
            ? true
            : false
        }
        style={{
          backgroundColor:
            !validateEmail(LoginForm.email) ||
            LoginForm.password === "" ||
            LoginForm.isSubmitting
              ? "gray"
              : "",
          cursor: LoginForm.isSubmitting ? "progress" : "pointer",
        }}
        data-nav-element-click="Signin With Password"
      >
        {translate("signIn")}
      </button>
    </>
  );
};

export default PasswordFlow;
