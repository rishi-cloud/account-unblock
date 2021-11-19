import React, { useState, useContext } from "react";
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
import { CommonDataContext } from "../../providers/CommonDataContext";
import { validate } from "password-sheriff/lib/rules/length";

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
    handleForgotPasswordClick,
    handleOptinsCheckBoxes,
    optinFields,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [displayRules, setDisplayRules] = useState(false);
  const { locale } = useContext(CommonDataContext);

  const { getKeys, displayablerule } = DisplayRules(
    passwordRules,
    PasswordPolicyState
  );
  const values = {
    a_contact_support: (chunks) => (
      <a
        style={{ color: "rgb(66, 88, 255)" }}
        className={styles.external_link}
        target="_blank"
        href={`https://home.mcafee.com/root/support.aspx?culture=${locale.toUpperCase()}`}
      >
        {chunks}
      </a>
    ),
    a_McAfee_License: (chunks) => (
      <a
        style={{ color: "rgb(66, 88, 255)" }}
        className={styles.external_link}
        target="_blank"
        href={`https://www.mcafee.com/en-au/consumer-support/policy/legal.html?culture=${locale.toUpperCase()}#eula`}
      >
        {chunks}
      </a>
    ),
    a_reset_pass: (chunks) => (
      <button
        type="button"
        className={styles.forgotPassword}
        onClick={handleForgotPasswordClick}
        id="forgot-password-button-click"
      >
        {chunks}
      </button>
    ),
    a_privacy_notice: (chunks) => (
      <a
        style={{ color: "rgb(66, 88, 255)" }}
        className={styles.external_link}
        target="_blank"
        href={`https://www.mcafee.com/legal?culture=${locale.toUpperCase()}&affid=916#privacytop`}
      >
        {chunks}
      </a>
    ),
  };
  console.log("block", optinFields);
  return (
    <div className={styles.formWrapper}>
      <form className={styles.InputWrapper}>
        <>
          {SignupForm.email !== "" ? (
            <div className={styles.InputLabel}>{translate("email")}</div>
          ) : null}
          <div
            className={styles.InputAndLogoSignup}
            style={{ background: SignupForm.isEmailDisable ? "#EFF0F2" : "" }}
          >
            <OutlineMail className={styles.emailSVG} />
            <FormattedMessage id="email">
              {(msg) => (
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={SignupForm.email}
                  placeholder={msg}
                  className={styles.Input}
                  onChange={onChange}
                  disabled={SignupForm.isEmailDisable}
                  style={{
                    background: SignupForm.isEmailDisable ? "#EFF0F2" : "",
                  }}
                />
              )}
            </FormattedMessage>
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
              <LockOutline className={styles.lockSVG} />
              <FormattedMessage id="password">
                {(msg) => (
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={SignupForm.password}
                    placeholder={msg}
                    className={styles.Input}
                    onChange={onChange}
                    onFocus={() => {
                      onClick();
                      setDisplayRules(true);
                    }}
                    onBlur={() => setDisplayRules(false)}
                  />
                )}
              </FormattedMessage>
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
              <LockOutline className={styles.lockSVG} />
              <FormattedMessage id="confirm_password">
                {(msg) => (
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={SignupForm.confirmPassword}
                    placeholder={msg}
                    className={styles.Input}
                    onChange={onChange}
                    onBlur={() => setDisplayRules(false)}
                  />
                )}
              </FormattedMessage>
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
          {optinFields && (
            <div className={styles.optinFieldsWrapper}>
              {optinFields.VirusThreats &&
                optinFields.VirusThreats.display === "true" && (
                  <div className={styles.optinField}>
                    <input
                      className={styles.optinFieldInput}
                      type="checkbox"
                      id="VirusThreats"
                      name="VirusThreats"
                      value="VirusThreats"
                      onChange={(e) => {
                        handleOptinsCheckBoxes(e.target.name);
                      }}
                      checked={
                        optinFields.VirusThreats.checked === "true"
                          ? true
                          : false
                      }
                    />
                    <label htmlFor="VirusThreats">
                      {translate("optin_VirusThreats")}
                    </label>
                  </div>
                )}
              {optinFields.SpecialPromo &&
                optinFields.SpecialPromo.display === "true" && (
                  <div className={styles.optinField}>
                    <input
                      className={styles.optinFieldInput}
                      type="checkbox"
                      id="SpecialPromo"
                      name="SpecialPromo"
                      value="SpecialPromo"
                      onChange={(e) => {
                        handleOptinsCheckBoxes(e.target.name);
                      }}
                      checked={
                        optinFields.SpecialPromo.checked === "true"
                          ? true
                          : false
                      }
                    />
                    <label htmlFor="SpecialPromo">
                      {translate("optin_SpecialPromo")}
                    </label>
                  </div>
                )}
              {optinFields.PartnerPromo &&
                optinFields.PartnerPromo.display === "true" && (
                  <div className={styles.optinField}>
                    <input
                      className={styles.optinFieldInput}
                      type="checkbox"
                      id="PartnerPromo"
                      name="PartnerPromo"
                      value="PartnerPromo"
                      onChange={(e) => {
                        handleOptinsCheckBoxes(e.target.name);
                      }}
                      checked={
                        optinFields.PartnerPromo.checked === "true"
                          ? true
                          : false
                      }
                    />
                    <label htmlFor="PartnerPromo">
                      {translate("optin_PartnerPromo")}
                    </label>
                  </div>
                )}
            </div>
          )}

          <div className={styles.PolicyLink}>
            <FormattedMessage
              id="By_clicking_Create_my_Account_you_accept_McAfee_License_Agreement_and_Privacy_Notice"
              defaultMessage="By clicking <b>Create my account</b> you accept <a_McAfee_License>McAfee’s License Agreement</a_McAfee_License> and <a_privacy_notice>Privacy Notice</a_privacy_notice>"
              values={{
                ...values,

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
              validate(SignupForm.email) &&
              SignupForm.password !== "" &&
              SignupForm.confirmPassword !== "" &&
              SignupForm.password === SignupForm.confirmPassword &&
              isValid &&
              !SignupForm.isSubmitting
                ? styles.SubmitButtonActive
                : styles.SubmitButton
            }
            onClick={onSubmit}
            id="Signup-submit-button-click"
          >
            {translate("Create_my_Account")}
          </button>
        </>
      </form>
    </div>
  );
};

export default Signup;
