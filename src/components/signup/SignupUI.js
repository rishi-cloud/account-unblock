import React, { useContext } from "react";
import { AppContext } from "../../providers/AppContext";
import { CommonDataContext } from "../../providers/CommonDataContext";
import Signup from "./Signup";
import styles from "./style.module.css";
import translate from "../../localization/translate";
import CircularLoader from "../../loader/CircularLoader";
import { ReactComponent as McAfeeLogo } from "../../svg/Mcafee-Logo.svg";
import { FormattedMessage } from "react-intl";

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
  } = props;
  // const { setWhichPage } = useContext(AppContext);
  const { SignupText } = useContext(CommonDataContext);
  return (
    <>
      {loader ? (
        <div className={styles.loaderWrapper}>
          <div className={styles.loaderLogo}>
            <McAfeeLogo className={styles.Logo} />
          </div>
          <div className={styles.loadercreatingyouraccount}>
            <img
              alt="McAfeeLogo"
              className={styles.loadinglogo}
              src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-odrplat-auth0-ui/public/images/McAfee-Document-Logo1.png"
            />
            <div className={styles.loadingtext}>
              {translate("Creating_your_account")}
            </div>
            <CircularLoader />
          </div>
        </div>
      ) : (
        <>
          <div className={styles.SignupWrapper}>
            <div className={styles.leftContainer}>
              <McAfeeLogo className={styles.Logo} />
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
                <div className={styles.BottomHeadingSignUp}>
                  {translate("Already_have_an_account")}
                  <p
                    className={styles.Signuppagelink}
                    onClick={() => changePage()}
                  >
                    {translate("Sign_in_now")}
                  </p>
                </div>
              ) : (
                <div
                  className={styles.Signuppagelink}
                  onClick={() => changePage()}
                >
                  {translate("Sign_in_with_a_different_email_address")}
                </div>
              )}
            </div>
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
                ></Signup>
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SignupUI;
