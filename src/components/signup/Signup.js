import React, { useState } from "react";
import styles from "./style.module.css";
import { ReactComponent as OutlineMail } from "../../svg/mailIcon.svg";
import { ReactComponent as LockOutline } from "../../svg/lockIcon.svg";
import { ReactComponent as FillEye } from "../../svg/eyeIcon.svg";
import { ReactComponent as PasswordTick } from "../../svg/passwordPolicyTick.svg";
import { ReactComponent as PasswordCross } from "../../svg/passwordPolicyCross.svg";
import { DisplayRules } from "../../utils/displayRules";
import { ReactComponent as TickIcon } from "../../svg/tickIcon.svg";
import translate from "../../localization/translate";
import { FormattedMessage } from "react-intl";

const Signup = (props) => {
  const {
    onSubmit,
    SignupForm,
    onChange,
    passwordRules,
    PasswordPolicyState,
    onClick,
    isValid,
    SignupError,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [displayRules, setDisplayRules] = useState(false);

  const { getKeys, displayablerule } = DisplayRules(
    passwordRules,
    PasswordPolicyState
  );
  return (
    <div className={styles.formWrapper}>
      <form className={styles.InputWrapper}>
        <>
          {SignupForm.email !== "" ? (
            <div className={styles.InputLabel}>{translate("email")}</div>
          ) : null}
          <div className={styles.InputAndLogoSignup}>
            <OutlineMail
              style={{
                height: "2rem",
                width: "2rem",
                marginTop: "0.5rem",
                color: "rgb(175, 174, 174)",
              }}
            />
            <input
              type="email"
              id="email"
              name="email"
              value={SignupForm.email}
              placeholder="Email"
              className={styles.Input}
              onChange={onChange}
            />
          </div>
          <div>
            {SignupForm.password !== "" ? (
              <div
                className={styles.InputLabelPass}
                style={{
                  color: isValid ? "#0CA77D" : "rgb(175, 174, 174)",
                }}
              >
                {translate("password")}
              </div>
            ) : null}
            <div
              className={styles.InputAndLogoSignup}
              // style={{
              //   border:
              //     LoginError.isEmailError === true
              //       ? "2px solid red"
              //       : LoginError.isEmailError === false
              //       ? "2px solid green"
              //       : "",
              // }}
              style={{
                border: `1px solid ${
                  isValid ? "#0CA77D" : "RGB(212, 213, 219)"
                }`,
              }}
            >
              <LockOutline
                style={{
                  height: "2rem",
                  width: "2rem",
                  marginTop: "0.5rem",
                  color: "rgb(175, 174, 174)",
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={SignupForm.password}
                placeholder="Password"
                className={styles.Input}
                onChange={onChange}
                onFocus={() => {
                  onClick();
                  setDisplayRules(true);
                }}
                onBlur={() => setDisplayRules(false)}
              />
              <FillEye
                style={{
                  height: "2rem",
                  width: "2rem",
                  marginTop: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  showPassword ? setShowPassword(false) : setShowPassword(true);
                }}
              />
              {isValid ? (
                <TickIcon
                  style={{
                    height: "2rem",
                    width: "2rem",
                    marginTop: "0.5rem",
                  }}
                />
              ) : null}
            </div>
          </div>
          <div className={styles.Passwordrulescontainer}>
            {displayRules ? (
              <>
                <div className={styles.Passwordrules}>
                  {displayablerule.map((item, index) => {
                    return (
                      <div className={styles.Rule} key={index}>
                        {" "}
                        <div className={styles.checkbox}>
                          {PasswordPolicyState[getKeys[index]] ? (
                            <PasswordTick className={styles.tick} />
                          ) : (
                            <PasswordCross className={styles.cancel} />
                          )}
                        </div>
                        <div className={styles.Ruletext}>{item}</div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : null}
          </div>
          <div>
            {SignupForm.confirmPassword !== "" ? (
              <div
                className={styles.InputLabelCPass}
                style={{
                  color:
                    SignupForm.password === SignupForm.confirmPassword &&
                    SignupForm.confirmPassword !== ""
                      ? "#0CA77D"
                      : "rgb(175, 174, 174)",
                }}
              >
                {translate("confirm_password")}
              </div>
            ) : null}
            <div
              className={styles.InputAndLogoSignup}
              // style={{
              //   border:
              //     LoginError.isEmailError === true
              //       ? "2px solid red"
              //       : LoginError.isEmailError === false
              //       ? "2px solid green"
              //       : "",
              // }}
              style={{
                border: `1px solid ${
                  SignupForm.password === SignupForm.confirmPassword &&
                  SignupForm.confirmPassword !== ""
                    ? "#0CA77D"
                    : "RGB(212, 213, 219)"
                }`,
              }}
            >
              <LockOutline
                style={{
                  height: "2rem",
                  width: "2rem",
                  marginTop: "0.5rem",
                  color: "rgb(175, 174, 174)",
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={SignupForm.confirmPassword}
                placeholder="Confirm password"
                className={styles.Input}
                onChange={onChange}
                onBlur={() => setDisplayRules(false)}
              />
              <FillEye
                style={{
                  height: "2rem",
                  width: "2rem",
                  marginTop: "0.7rem",
                  color: "rgb(175, 174, 174)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  showPassword ? setShowPassword(false) : setShowPassword(true);
                }}
              />
              {SignupForm.password === SignupForm.confirmPassword &&
              SignupForm.confirmPassword !== "" ? (
                <TickIcon
                  style={{
                    height: "2rem",
                    width: "2rem",
                    marginTop: "0.5rem",
                  }}
                />
              ) : null}
            </div>
          </div>
          {SignupError.errorCode && (
            <div className={styles.Error}>
              {translate(SignupError.errorCode)}
            </div>
          )}
          <div className={styles.PolicyLink}>
            <FormattedMessage
              id="By_clicking_Create_my_Account_you_accept_McAfee_License_Agreement_and_Privacy_Notice"
              defaultMessage="By clicking <b>Create my account</b> you accept <a>McAfee’s License Agreement</a> and <a>Privacy Notice</a>"
              values={{
                a: (chunks) => (
                  <a
                    style={{ color: "rgb(66, 88, 255)" }}
                    className={styles.external_link}
                    target="_blank"
                    href="https://www.example.com/shoe"
                  >
                    {chunks}
                  </a>
                ),

                b: (chunks) => <strong>{chunks}</strong>,
              }}
            >
              {(chunks) => <p>{chunks}</p>}
            </FormattedMessage>
            {/* {translate("By_clicking")}
              <span style={{ fontWeight: "bold" }}>
                {" "}
                {translate("Create_my_Account")},{" "}
              </span>
              {translate("you_accept")}{" "}
              <span style={{ color: "rgb(66, 88, 255)" }}>
                {translate("McAfee_License_Agreement")}
              </span>{" "}
              {translate("and")}{" "}
              <span style={{ color: "rgb(66, 88, 255)" }}>
                {translate("Privacy_Notice")}
              </span> */}
          </div>
          <button
            className={
              SignupForm.email !== "" &&
              SignupForm.password !== "" &&
              SignupForm.confirmPassword !== "" &&
              SignupForm.password === SignupForm.confirmPassword &&
              isValid &&
              !SignupForm.isSubmitting
                ? styles.SubmitButtonActive
                : styles.SubmitButton
            }
            onClick={onSubmit}
          >
            <div>{translate("Create_my_Account")}</div>
          </button>
        </>
      </form>
    </div>
  );
};

export default Signup;
