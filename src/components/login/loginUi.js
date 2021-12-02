import React, { useContext, useEffect } from "react";
import { AppContext } from "../../providers/AppContext";
import { CommonDataContext } from "../../providers/CommonDataContext";
import styles from "./style.module.css";
import Login from "./Login";
import translate from "../../localization/translate";

import LoaderScreen from "../../loader/LoaderScreen";
import Timer from "../Timer/index";
import PasswordBlockScreen from "./view/PasswordBlockScreen";
import OtpBlockScreen from "./view/OtpBlockScreen";
import { FormattedMessage } from "react-intl";
import { ReactComponent as McAfeeLogo } from "../../svg/Mcafee-Logo.svg";
import { useLocation } from "react-router-dom";

const LoginUI = (props) => {
  const {
    onChange,
    switchLogin,
    onToggle,
    onSubmit,
    LoginError,
    LoginForm,
    validateEmail,
    Continue,
    onPressContinue,
    getOtp,
    socialBtn,
    hideEmail,
    loader,
    otpTimer,
    otpValid,
    setOtpValid,
    TimerState,
    setTimer,
    changePage,
    handleForgotPasswordClick,
    blockScreenToggle,
    blockScreenState,
    onlyPasswordLock,
    onlyOTPLock,
    resendingCode,
    handleClickResendCode,
    onLoad,
  } = props;
  const { LoginText, utagData, locale } = useContext(CommonDataContext);
  const { isAffiliateLogo } = useContext(CommonDataContext);

  const trackClickEvent = (navElement) => {
    let utag = window.utag;
    let updatedUtagData = { ...utagData };
    updatedUtagData["tm_global_tealium_calltype"] = "manual";
    updatedUtagData["tm_global_navigation_element"] = navElement;
    updatedUtagData["tm_global_navigation_element_click"] = "true";
    utag?.link(updatedUtagData);
  };
  const FORMATVALUES = {
    a_contact_support: (chunks) => (
      <a
        style={{ color: "rgb(66, 88, 255)" }}
        className={styles.external_link}
        target="_blank"
        href={`https://home.mcafee.com/root/support.aspx?culture=${locale.toUpperCase()}`}
        data-nav-element-click="contact-support"
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
        data-nav-element-click="McAfee-License-link-click"
      >
        {chunks}
      </a>
    ),
    a_reset_pass: (chunks) => (
      <strong
        className={styles.important}
        style={{ color: "rgb(66, 88, 255)" }}
        onClick={(e) => handleForgotPasswordClick(e)}
        data-navelement="forgot-password-button-click"
      >
        {chunks}
      </strong>
    ),
    a_signin_otp: (chunks) => (
      <strong
        className={styles.important}
        onClick={onToggle}
        data-navelement="Sigin-With-OTP"
      >
        {translate("Sign_in_with_a_onetime_passcode")}
      </strong>
    ),
    a_privacy_notice: (chunks) => (
      <a
        style={{ color: "rgb(66, 88, 255)" }}
        className={styles.external_link}
        target="_blank"
        href={`https://www.mcafee.com/legal?culture=${locale.toUpperCase()}&affid=916#privacytop`}
        data-nav-element-click="privacy-notice-link-clicked"
      >
        {chunks}
      </a>
    ),
  };
  useEffect(() => {
    onLoad();
  }, []);
  const loginCustomization = LoginForm.customizations;

  //   const location = useLocation().search;
  //   const getAffiliate = (location) => {
  //     const parsedHash = new URLSearchParams(window.location.hash.substr(1));
  //     let query = new URLSearchParams(location);
  //     let affiliate = query.get("affid") ?? parsedHash.get("affid");
  //     return affiliate;
  // }

  //   const getCulture = (location) => {
  //     const parsedHash = new URLSearchParams(window.location.hash.substr(1));
  //     let query = new URLSearchParams(location);
  //     let culture = query.get("culture") ?? parsedHash.get("culture");
  //     return culture;
  // }

  // const culture = getCulture(location);
  // const possiblePaths = {
  //   'en-us': require('../../customization/en-us.json')
  // }

  // const getCultureSettingsFile = (culture)=> {
  //  return possiblePaths[culture]
  // }
  // const affiliate = getAffiliate(location);

  // const getAffiliateLogo = (culture)=>{
  //   let isAffiliateLogoAvailable=false;
  // if(culture)
  // {
  //   const cultureSettings= getCultureSettingsFile(culture);
  //   if(cultureSettings && affiliate && cultureSettings.affiliates && cultureSettings.affiliates[affiliate])
  //   isAffiliateLogoAvailable = cultureSettings.affiliates[affiliate].affiliateLogo !== null ? cultureSettings.affiliates[affiliate].affiliateLogo : false;
  //   else if (cultureSettings && cultureSettings.affiliateLogo)
  //   isAffiliateLogoAvailable=cultureSettings.affiliateLogo;
  // }
  // return isAffiliateLogoAvailable;
  // }

  // const isAffiliateLogo= getAffiliateLogo(culture);

  // console.log(isAffiliateLogo);

  const BottomHeading = () => {
    if (!blockScreenState.passwordBlock && !blockScreenState.otpBlock) {
      //const loginCustomization = LoginForm.customizations;
      return (
        !loginCustomization?.hideSignUp && (
          <div className={styles.LoginBottomHeading}>
            <div>{translate("Do_not_have_an_account")}</div>
            <div
              className={styles.Loginpagelink}
              onClick={(e) => {
                changePage(e);
              }}
              data-navelement="Signup-page-link-button"
            >
              {translate("Create_one_now")}
            </div>
          </div>
        )
      );
    } else {
      if (blockScreenState.otpBlock && blockScreenState.passwordBlock) {
        return (
          <div
            className={styles.Signuppagelink}
            onClick={(e) => blockScreenToggle("both-locked", e)}
            data-navelement="Signin-redirect-from-blockscreen"
          >
            {translate("Sign_in_with_a_different_email_address")}
          </div>
        );
      } else if (blockScreenState.passwordBlock && onlyPasswordLock) {
        console.log("inside this one");
        return (
          <div className={styles.LoginBottomHeading}>
            <p>
              {translate(
                "login.auth0_password_lock",
                "We sent a one-time passcode to <b>{email}</b>",
                {
                  ...FORMATVALUES,
                  a: (chunks) => (
                    <strong className={styles.important}>{chunks}</strong>
                  ),
                }
              )}
            </p>
          </div>
        );
      } else if (blockScreenState.otpBlock && onlyOTPLock) {
        return (
          <div className={styles.LoginBottomHeading}>
            <p>
              {translate(
                "otp_lock_bottom_Message",
                "You may sign in with a password, try <a>resetting your password</a> or <b>Contact Support.</b>",
                {
                  ...FORMATVALUES,
                  a: (chunks) => (
                    <strong className={styles.important}>{chunks}</strong>
                  ),
                  b: (chunks) => (
                    <strong className={styles.important}>{chunks}</strong>
                  ),
                }
              )}
            </p>
          </div>
        );
      } else {
        return (
          !loginCustomization.hideSignUp && (
            <div className={styles.LoginBottomHeading}>
              <div>{translate("Do_not_have_an_account")}</div>
              <div
                className={styles.Loginpagelink}
                onClick={(e) => {
                  changePage(e);
                }}
                navElement="Signup-page-link-button"
              >
                {translate("Create_one_now")}
              </div>
            </div>
          )
        );
      }
    }
  };
  const RightContainerContent = () => {
    if (blockScreenState.otpBlock && blockScreenState.passwordBlock) {
      return null;
    } else if (blockScreenState.otpBlock || blockScreenState.passwordBlock) {
      if (blockScreenState.passwordBlock && onlyPasswordLock) {
        return <PasswordBlockScreen blockScreenToggle={blockScreenToggle} />;
      } else if (blockScreenState.otpBlock && onlyOTPLock) {
        return (
          <OtpBlockScreen
            onChange={onChange}
            LoginError={LoginError}
            LoginForm={LoginForm}
            validateEmail={validateEmail}
            onSubmit={onSubmit}
            trackClickEvent={trackClickEvent}
            LoginText={LoginText}
            handleForgotPasswordClick={handleForgotPasswordClick}
            blockScreenState={blockScreenState}
            blockScreenToggle={blockScreenToggle}
            resendingCode={resendingCode}
            handleClickResendCode={handleClickResendCode}
          />
        );
      } else {
        return (
          <div className={styles.LoginRightWrapper}>
            <Login
              LoginError={LoginError}
              onChange={onChange}
              switchLogin={switchLogin}
              onSubmit={onSubmit}
              LoginForm={LoginForm}
              onToggle={onToggle}
              onPressContinue={onPressContinue}
              Continue={Continue}
              getOtp={getOtp}
              validateEmail={validateEmail}
              socialBtn={socialBtn}
              hideEmail={hideEmail}
              LoginText={LoginText}
              otpValid={otpValid}
              setOtpValid={setOtpValid}
              handleForgotPasswordClick={handleForgotPasswordClick}
              setTimer={setTimer}
              trackClickEvent={trackClickEvent}
              blockScreenState={blockScreenState}
              locale={locale}
              resendingCode={resendingCode}
              handleClickResendCode={handleClickResendCode}
            />
          </div>
        );
      }
    } else {
      return (
        <div className={styles.LoginRightWrapper}>
          <Login
            LoginError={LoginError}
            onChange={onChange}
            switchLogin={switchLogin}
            onSubmit={onSubmit}
            LoginForm={LoginForm}
            onToggle={onToggle}
            onPressContinue={onPressContinue}
            Continue={Continue}
            getOtp={getOtp}
            validateEmail={validateEmail}
            socialBtn={socialBtn}
            hideEmail={hideEmail}
            LoginText={LoginText}
            otpValid={otpValid}
            setOtpValid={setOtpValid}
            handleForgotPasswordClick={handleForgotPasswordClick}
            setTimer={setTimer}
            trackClickEvent={trackClickEvent}
            blockScreenState={blockScreenState}
            locale={locale}
            resendingCode={resendingCode}
            handleClickResendCode={handleClickResendCode}
          />
        </div>
      );
    }
  };

  return (
    <>
      {loader ? (
        <LoaderScreen text="Signing_you_in" />
      ) : (
        <>
          <div className={styles.LoginContainer}>
            <div className={styles.LoginLeftWrapper}>
              <div className={styles.LoginWelcomeContainer}>
                {isAffiliateLogo ? (
                  <div class="container-header">
                    <span class="container-logo">
                      <img
                        alt="McAfee"
                        title="McAfee"
                        src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-odrplat-auth0-ui/public/images/McAfee-Document-Logo1.png"
                        class="logo"
                      />
                    </span>
                    <span class="container-logo aff-logo-container">
                      <span class="logo-seperator">| </span>
                      <img
                        alt="McAfee"
                        title="Dell"
                        src="https://secureimages.mcafee.com/common/affiliateImages/dell/logo_dell_new_58x59.gif"
                        width="20"
                        height="20"
                      />
                    </span>
                  </div>
                ) : (
                  <McAfeeLogo className={styles.Logo} />
                )}
                <div className={styles.LoginIntro}>
                  {translate(LoginText.title)}
                </div>
                <div
                  className={styles.LoginIntroSubHeading}
                  style={{
                    display:
                      blockScreenState.otpBlock &&
                      blockScreenState.passwordBlock
                        ? "block"
                        : (blockScreenState.otpBlock && onlyOTPLock) ||
                          (blockScreenState.passwordBlock && onlyPasswordLock)
                        ? "none"
                        : "block",
                  }}
                >
                  {LoginText?.subtitle &&
                    translate(
                      LoginText.subtitle,
                      "We sent a one-time passcode to <b>{email}</b>",
                      {
                        ...FORMATVALUES,
                        b: (chunks) => <strong>{chunks}</strong>,
                        email: `${LoginForm.email}`,
                        a: (chunks) => (
                          <strong className={styles.important}>{chunks}</strong>
                        ),
                      }
                    )}
                </div>
                {otpTimer && !LoginError.errorCode ? (
                  <Timer
                    initialMinute={3}
                    setOtpValid={setOtpValid}
                    setTimer={setTimer}
                    TimerState={TimerState}
                    getOtp={getOtp}
                  />
                ) : null}
                {LoginError.errorCode && (
                  <div className={styles.ErrorDiv}>
                    <p>
                      <FormattedMessage
                        id={LoginError.errorCode}
                        defaultMessage="We're sorry, something went wrong"
                        values={{
                          ...FORMATVALUES,
                          b: (chunks) => (
                            <strong className={styles.importantBold}>
                              {chunks}
                            </strong>
                          ),
                          br: (chunks) => (
                            <strong style={{ color: "#890611" }}>
                              {chunks}
                            </strong>
                          ),
                          a_rotp: (chunks) => (
                            <strong
                              className={styles.important}
                              onClick={getOtp}
                              data-nav-element-click="requesting-otp-for-login"
                            >
                              {chunks}
                            </strong>
                          ),
                          email: `${LoginForm.email}`,
                        }}
                      ></FormattedMessage>
                    </p>
                  </div>
                )}
                <div className={styles.HorizontalSignupdashedline}></div>
                {BottomHeading()}
              </div>
            </div>
            <div className={styles.RightLoginContainer}>
              {RightContainerContent()}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginUI;
