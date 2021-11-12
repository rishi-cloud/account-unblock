import React, { useState } from "react";
import "./style.css";
import translate from "../../localization/translate";
import { ReactComponent as OutlineMail } from "../../svg/mailIcon.svg";
import { ReactComponent as LockOutline } from "../../svg/lockIcon.svg";
import { ReactComponent as TickIcon } from "../../svg/tickIcon.svg";
import { ReactComponent as FillEye } from "../../svg/eyeIcon.svg";
import { TealiumTagValueConstans } from "../../constants/TealiumConstants";

const PasswordFlow = (props) => {
  const {
    onChange,
    LoginError,
    LoginForm,
    validateEmail,
    onSubmit,
    trackClickEvent,
    LoginText,
    handleForgotPasswordClick,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="LoginInputContainer">
          {LoginForm.email !== "" ? (
            <div
              className="LoginInputLabel"
              style={{
                color: validateEmail(LoginForm.email) ? "#0CA77D" : "red",
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
                LoginError.isEmailError === true
                  ? "1px solid red"
                  : validateEmail(LoginForm.email)
                  ? "1px solid #0CA77D"
                  : "1px solid #848faa",
              backgroundColor: "#ffff",
              borderRadius: "1rem",
            }}
          >
            <OutlineMail
              className="LoginInputLogo"
              style={{
                color: validateEmail(LoginForm.email) ? "green" : "",
              }}
            />
            <input
              type="email"
              id="email"
              name="email"
              value={LoginForm.email}
              placeholder="Email"
              className="LoginInput"
              onChange={onChange}
            />
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
          </div>
        </div>
      </div>
      {LoginError.email && <div className="Error">{LoginError.email}</div>}
      <>
        <div className="LoginInputContainerPassword">
          {LoginForm.password !== "" ? (
            <div className="LoginInputLabel">{translate("password")}</div>
          ) : null}
          <div
            style={{
              display: "flex",
              borderRadius: "1rem",
              backgroundColor: "#ffff",
            }}
          >
            <LockOutline className="LoginInputLogo" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              className="LoginInput"
              onChange={onChange}
            />
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
            />
          </div>
        </div>
        <div className="forgotPasswordContainer">
          <button
            type="button"
            className="forgotPassword"
            onClick={handleForgotPasswordClick}
          >
            {translate('Forgot_password')}
          </button>
        </div>
      </>
      <button
        className="SigninWithPassword"
        onClick={(e) =>
          onSubmit(e) &&
          trackClickEvent(TealiumTagValueConstans.SIGNIN_CONTINUE_BUTTON)
        }
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
      >
        <div>{translate("signIn")}</div>
      </button>
    </>
  );
};

export default PasswordFlow;
