import React, { useState } from "react";
import "./style.css";
import { DisplayRules } from "../../utils/displayRules";
import { ReactComponent as LockOutline } from "../../svg/lockIcon.svg";
import { ReactComponent as FillEye } from "../../svg/eyeIcon.svg";
import { ReactComponent as PasswordTick } from "../../svg/passwordPolicyTick.svg";
import { ReactComponent as PasswordCross } from "../../svg/passwordPolicyCross.svg";
import { ReactComponent as TickIcon } from "../../svg/tickIcon.svg";
import translate from "../../localization/translate";

function ChangePasswordForm(props) {
  const {
    onChange,
    ResetPasswordForm,
    onClick,
    isValid,
    ResetPasswordError,
    handleResetPassword,
    passwordRules,
    PasswordPolicyState,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [displayRules, setDisplayRules] = useState(false);

  const { getKeys, displayablerule } = DisplayRules(
    passwordRules,
    PasswordPolicyState
  );
  return (
    <div className="ForgotPasswordRightWrapper">
      <div className="flexGrow">
        <form className="InputWrapper" style={{height: '100%'}}>
          <>
            <div>
              {ResetPasswordForm.password !== "" ? (
                <div
                  className="ResetPasswordHeader"
                  style={{
                    color: isValid ? "#0CA77D" : "rgb(175, 174, 174)",
                  }}
                >
                  {translate("password")}
                </div>
              ) : null}
              <div
                className="ResetPasswordBtnWrapper"
                style={{
                  border: `1px solid ${
                    isValid ? "#0CA77D" : "RGB(212, 213, 219)"
                  }`,
                  marginBottom: `${displayRules ? "0rem" : "1.25rem"}`,
                }}
              >
                <LockOutline
                  style={{
                    height: "1.4rem",
                    width: "1.4rem",
                    color: "rgb(175, 174, 174)",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={ResetPasswordForm.password}
                  placeholder="Password"
                  className="ResetPasswordInput"
                  onChange={onChange}
                  onFocus={() => {
                    onClick();
                    setDisplayRules(true);
                  }}
                  onBlur={() => setDisplayRules(false)}
                />
                <FillEye
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    cursor: "pointer",
                    padding: "1px",
                  }}
                  onClick={() => {
                    showPassword
                      ? setShowPassword(false)
                      : setShowPassword(true);
                  }}
                />
                {isValid && (
                  <TickIcon
                    style={{
                      height: "1.5rem",
                      width: "1.5rem",
                      padding: "1px",
                      // marginTop: "0.5rem",
                    }}
                  />
                )}
              </div>
            </div>

            {displayRules && (
              <div
                className="Password-rules-container"
                style={{ marginBottom: "1.5rem" }}
              >
                <div className="Password-rules">
                  {displayablerule.map((item, index) => {
                    return (
                      <div className="Rule" key={index}>
                        <div className="checkbox">
                          {PasswordPolicyState[getKeys[index]] ? (
                            <PasswordTick className="tick" />
                          ) : (
                            <PasswordCross className="cancel" />
                          )}
                        </div>
                        <div className="Rule-text">{item}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div>
              {ResetPasswordForm.confirmPassword !== "" ? (
                <div
                  className="ResetPasswordHeader"
                  style={{
                    color:
                      ResetPasswordForm.password ===
                        ResetPasswordForm.confirmPassword &&
                      ResetPasswordForm.confirmPassword !== ""
                        ? "#0CA77D"
                        : "rgb(175, 174, 174)",
                  }}
                >
                  {translate("confirm_password")}
                </div>
              ) : null}
              <div
                className="ResetPasswordBtnWrapper"
                style={{
                  border: `1px solid ${
                    ResetPasswordForm.password ===
                      ResetPasswordForm.confirmPassword &&
                    ResetPasswordForm.confirmPassword !== ""
                      ? "#0CA77D"
                      : "RGB(212, 213, 219)"
                  }`,
                }}
              >
                <LockOutline
                  style={{
                    height: "1.4rem",
                    width: "1.4rem",
                    // marginTop: "0.5rem",
                    color: "rgb(175, 174, 174)",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={ResetPasswordForm.confirmPassword}
                  placeholder="Confirm Password"
                  className="ResetPasswordInput"
                  onChange={onChange}
                  onBlur={() => setDisplayRules(false)}
                />
                <FillEye
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    padding: "1px",
                    // marginTop: "0.7rem",
                    color: "rgb(175, 174, 174)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    showPassword
                      ? setShowPassword(false)
                      : setShowPassword(true);
                  }}
                />
                {ResetPasswordForm.password ===
                  ResetPasswordForm.confirmPassword &&
                ResetPasswordForm.confirmPassword !== "" ? (
                  <TickIcon
                    style={{
                      height: "1.5rem",
                      width: "1.5rem",
                      padding: "1px",
                      // marginTop: "0.5rem",
                    }}
                  />
                ) : null}
              </div>
            </div>
            {ResetPasswordError.errorCode && (
              <div className="Error">
                {translate(ResetPasswordError.errorCode)}
              </div>
            )}
            <div className="forgotPasswordDropDownContainer">
              <button
                className={
                  ResetPasswordForm.password !== "" &&
                  ResetPasswordForm.confirmPassword !== "" &&
                  ResetPasswordForm.password ===
                    ResetPasswordForm.confirmPassword &&
                  isValid &&
                  !ResetPasswordForm.isSubmitting
                    ? "emailMeBtn"
                    : "emailMeBtn emailMeBtnDisabled"
                }
                onClick={handleResetPassword}
                disabled={ResetPasswordForm.isSubmitting}
              >
                {translate('Reset_Password')}
              </button>
            </div>
          </>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
