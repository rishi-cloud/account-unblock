import React, { useContext } from "react";
import translate from "../../localization/translate";
import { AiOutlineMail } from "react-icons/ai";
import "./style.css";
import ForgotPasswordEmail from "./ForgotPasswordEmail";
import { FormattedMessage } from "react-intl";
import { CommonDataContext } from "../../providers/CommonDataContext";
function ForgotPasswordUI(props) {
  const {
    emailDetails,
    handleEmailChange,
    handleEmailMe,
    backToSignIn,
    validateEmail,
  } = props;
  const { locale } = useContext(CommonDataContext);
  const FORMATVALUES = {
    a_contact_support: (chunks) => (
      <a
        style={{ color: "rgb(66, 88, 255)" }}
        href={`https://home.mcafee.com/root/support.aspx?culture=${locale.toUpperCase()}`}
      >
        {chunks}
      </a>
    ),
  };
  return (
    <>
      {emailDetails.emailSent ? (
        <ForgotPasswordEmail backToSignIn={backToSignIn} />
      ) : (
        <div className="ForgotPasswordContainer">
          <div className="ForgotPasswordLeftWrapper">
            <div className="ForgotPasswordLeftContainer">
              <img
                alt="McAfeeLogo"
                className="McAfeeLogo"
                src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-React-Appp/public/images/McAfee-Logo.png"
              />
              <div className="ForgotPasswordIntro">
                {translate("Reset_Password")}
              </div>
              <div className="ForgotPasswordIntroSubHeading">
                {translate("Enter_email_to_reset_password")}
              </div>
            </div>
          </div>
          <div className="ForgotPasswordRightWrapper">
            <div className="ForgotPasswordEmailInputContainer">
              {emailDetails.email !== "" ? (
                <div
                  className="ForgotPasswordInputLabel"
                  style={{
                    color: validateEmail(emailDetails.email)
                      ? "#0CA77D"
                      : "red",
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
                    emailDetails.emailError !== ""
                      ? "1px solid red"
                      : emailDetails.email === ""
                      ? "1px solid #848faa"
                      : " 1px solid #0CA77D",
                  backgroundColor: "#ffff",
                  borderRadius: "1rem",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <AiOutlineMail className="ForgotPasswordEmailLogo" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={emailDetails.email}
                  placeholder="Email"
                  className="ForgotPasswordEmailInput"
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            {emailDetails.emailError !== "" && (
              <div className="Error">{emailDetails.emailError}</div>
            )}
            <div className="forgotPasswordDropDownContainer">
              <div className="emailMeBtnWrapper">
                <button
                  onClick={handleEmailMe}
                  className={`emailMeBtn
                  ${
                    emailDetails.emailError !== "" || emailDetails.email === ""
                      ? "emailMeBtnDisabled"
                      : ""
                  }`}
                  disabled={
                    emailDetails.emailError !== "" || emailDetails.email === ""
                  }
                  id="Sending-email-for-reset-password-submit-button"
                >
                  {translate("Email_me")}
                </button>
              </div>
              <div className="contactSupportWrapper">
                <FormattedMessage
                  id="Forgot_your_password_contact_support"
                  defaultMessage={translate(
                    "Forgot_your_password_contact_support"
                  )}
                  values={{
                    ...FORMATVALUES,
                    a: (chunks) => (
                      <a
                        className="contactSupportBtn"
                        target="_blank"
                        href="https://www.example.com/shoe"
                      >
                        {chunks}
                      </a>
                    ),
                  }}
                >
                  {(chunks) => <p className="contactSupportText">{chunks}</p>}
                </FormattedMessage>
              </div>
              <hr className="dottedLine" />
              <div className="signInBtnWrapper">
                <button
                  className="signInBtn"
                  onClick={backToSignIn}
                  id="Signin-page-redirect-from-forgotpassword"
                >
                  {translate("Go_back_to_signin")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ForgotPasswordUI;
