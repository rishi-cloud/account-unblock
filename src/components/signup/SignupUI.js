import React, { useContext, useEffect } from "react";
import { AppContext } from "../../providers/AppContext";
import { CommonDataContext } from "../../providers/CommonDataContext";
import Signup from "./Signup";
import styles from "./style.module.css";
import translate from "../../localization/translate";
import LoaderScreen from "../../loader/LoaderScreen";
import { ReactComponent as McAfeeLogo } from "../../svg/Mcafee-Logo.svg";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router-dom";

const SignupUI = (props) => {
  const {
    onSubmit,
    SignupForm,
    onChange,
    onClick,
    passwordRules,
    PasswordPolicyState,
    isValid,
    SignupError,
    loader,
    // setLoginForm,
    // LoginForm,
    changePage,
    showSignupForm,
    errorEmail,
    handleOptinsCheckBoxes,
    optinFields,
    validateEmail,
    setLoginForm,
    LoginForm,
    onLoad,
  } = props;
  // const { setWhichPage } = useContext(AppContext);
  const { SignupText } = useContext(CommonDataContext);
  const { setWhichPage } = useContext(AppContext);
  const { isAffiliateLogo } = useContext(CommonDataContext);
  useEffect(() => {
    onLoad();
  }, []);
  const signUpCustomization = SignupForm.customizations;
  //   console.log(signUpCustomization);

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

  //   const getAffiliateLogo = (culture)=>{
  //     let isAffiliateLogoAvailable=false;
  //   if(culture)
  //   {
  //     const cultureSettings= getCultureSettingsFile(culture);
  //     if(cultureSettings && affiliate && cultureSettings.affiliates && cultureSettings.affiliates[affiliate])
  //     isAffiliateLogoAvailable = cultureSettings.affiliates[affiliate].affiliateLogo !== null ? cultureSettings.affiliates[affiliate].affiliateLogo : false;
  //     else if (cultureSettings && cultureSettings.affiliateLogo)
  //     isAffiliateLogoAvailable=cultureSettings.affiliateLogo;
  //   }
  //   return isAffiliateLogoAvailable;
  //   }

  //   const isAffiliateLogo= getAffiliateLogo(culture);

  return (
    <>
      {loader ? (
        <LoaderScreen text="Creating_your_account" />
      ) : (
        <div className={styles.SignupWrapper}>
          <div className={styles.leftContainer}>
            {isAffiliateLogo ? (
              <div class="container-header">
                <span id="n_McafeeLogo" class="container-logo">
                  <img
                    id="mcafeeLogo"
                    alt="McAfee"
                    title="McAfee"
                    src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-odrplat-auth0-ui/public/images/McAfee-Document-Logo1.png"
                    class="logo"
                  />
                </span>
                <span
                  id="n_AffiliateLogo"
                  class="container-logo aff-logo-container"
                >
                  <span class="logo-seperator">| </span>
                  <img
                    id="affiliateLogo"
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
            {/* <McAfeeLogo className="Logo" /> */}
            <div className={styles.Intro}>{translate(SignupText.title)}</div>
            {showSignupForm ? (
              <div className={styles.IntroSubHeading}>
                <div className={styles.Points}>
                  {translate(SignupText.subtitle)}
                </div>
              </div>
            ) : null}
            {SignupError.errorCode ? (
              <>
                <div className={styles.IntroSubHeadingWithError}>
                  <div className={styles.ErrorPoints}>
                    <FormattedMessage
                      id={SignupError.errorCode}
                      defaultMessage="We can’t create an account for <b>{email}</b> because your email is from a country subject to US export restrictions, or your company is on a list of prohibited organizations, either by the US or foreign government agency."
                      values={{
                        b: (chunks) => <strong>{chunks}</strong>,
                        email: `${errorEmail}`,
                      }}
                    />
                  </div>
                  <div className={styles.Points}>
                    <FormattedMessage
                      id="Email_us_at"
                      defaultMessage="Email us at <b>export@mcafee.com</b> if you have any questions."
                      values={{
                        b: (chunks) => (
                          <p className={styles.boldid}>{chunks}</p>
                        ),
                      }}
                    />
                  </div>
                </div>
              </>
            ) : null}
            <div className={styles.HorizontalSignupdashedline}></div>
            {showSignupForm ? (
              !signUpCustomization.hideLoginCTA && (
                <div className={styles.BottomHeadingSignUp}>
                  {translate("Already_have_an_account")}
                  <p
                    className={styles.Signuppagelink}
                    onClick={(e) => changePage(e)}
                    data-navelement="Signin-page-redirect-from-signup"
                  >
                    {translate("Sign_in_now")}
                  </p>
                </div>
              )
            ) : (
              <div
                className={styles.Signuppagelink}
                onClick={(e) => changePage(e)}
                data-navelement="Signin-with-different-email-redirect-link"
              >
                {translate("Sign_in_with_a_different_email_address")}
              </div>
            )}
          </div>
          <div className={styles.RightContainerWrapper}>
            <div className={styles.RightContainerSignup}>
              {showSignupForm ? (
                <Signup
                  onChange={onChange}
                  onSubmit={onSubmit}
                  SignupForm={SignupForm}
                  onClick={onClick}
                  passwordRules={passwordRules}
                  PasswordPolicyState={PasswordPolicyState}
                  isValid={isValid}
                  SignupError={SignupError}
                  handleOptinsCheckBoxes={handleOptinsCheckBoxes}
                  optinFields={optinFields}
                  validateEmail={validateEmail}
                ></Signup>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupUI;
