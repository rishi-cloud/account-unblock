import React, { useState } from "react";
import "./style.css";
import ChangePasswordForm from "./ChangePasswordForm";
import translate from "../../localization/translate";
import { FormattedMessage } from "react-intl";

function ResetPasswordUI(props) {
  const {
    onChange,
    ResetPasswordForm,
    onClick,
    passwordRules,
    PasswordPolicyState,
    isValid,
    ResetPasswordError,
    handleResetPassword,
    resetPasswordSuccessful,
    email,
  } = props;

  return (
    <div className="ForgotPasswordContainer">
      <div className="ForgotPasswordLeftWrapper">
        <div className="LoginWelcomeContainer">
          <img
            alt="McAfeeLogo"
            className="McAfeeLogo"
            src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-React-Appp/public/images/McAfee-Logo.png"
          />
          {resetPasswordSuccessful ? (
            <>
              <div className="ForgotPasswordIntro">
                {translate("Password_successfully_reset")}
              </div>
              <div className="ForgotPasswordIntroSubHeading">
                {translate("Close_tab_to_previous_page_to_signin")}
              </div>
            </>
          ) : (
            <>
              <div className="ForgotPasswordIntro">
                {translate("Reset_Password")}
              </div>
              <div className="ForgotPasswordIntroSubHeading">
                <FormattedMessage
                  id="Enter_new_password"
                  defaultMessage={translate("Enter_new_password")}
                  values={{
                    email: email,
                  }}
                ></FormattedMessage>
              </div>
            </>
          )}
        </div>
      </div>
      {!resetPasswordSuccessful && (
        <ChangePasswordForm
          onChange={onChange}
          ResetPasswordForm={ResetPasswordForm}
          onClick={onClick}
          isValid={isValid}
          ResetPasswordError={ResetPasswordError}
          handleResetPassword={handleResetPassword}
          passwordRules={passwordRules}
          PasswordPolicyState={PasswordPolicyState}
        />
      )}
    </div>
  );
}

export default ResetPasswordUI;
