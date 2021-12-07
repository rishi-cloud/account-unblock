import React, { useContext } from "react";
import translate from "../../localization/translate";
import { FormattedMessage } from "react-intl";
import styles from "./style.module.css";
import { CommonDataContext } from "../../providers/CommonDataContext";

function AccountUnblockUI(props) {
  const { message, success, handleEmailMe } = props;
  const { locale } = useContext(CommonDataContext);
  const { isAffiliateLogo } = useContext(CommonDataContext);
  console.log(message, success);
  return (
    <div className="ForgotPasswordContainer">
      <div className="ForgotPasswordLeftWrapper flexGrow limitWidth">
        <div className="ForgotPasswordLeftContainer" style={{ height: "100%" }}>
          <div>
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
              <img
                alt="McAfeeLogo"
                className="McAfeeLogo"
                src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-React-Appp/public/images/McAfee-Logo.png"
              />
            )}
          </div>
          {success.current === "true" ? (
            <>
              <div className="ForgotPasswordIntro">
                {translate("Your_account_unlocked")}
              </div>
              <div className="ForgotPasswordIntroSubHeading">
                {translate("Signin_to_start_using_protection")}
              </div>
            </>
          ) : (
            <>
              <div className="ForgotPasswordIntro">
                {translate("Link_Expired")}
              </div>
              <div className="ForgotPasswordIntroSubHeading">
                <FormattedMessage
                  id="Reset_password_to_unlock_account"
                  defaultMessage={
                    "Reset your password or <a_contact_support>Contact Support</a_contact_support> to unlock your account."
                  }
                  values={{
                    a_contact_support: (chunks) => (
                      <a
                        className="contactSupportBtn"
                        target="_blank"
                        href={`https://home.mcafee.com/root/support.aspx?culture=${locale.toUpperCase()}`}
                      >
                        {chunks}
                      </a>
                    ),
                  }}
                >
                  {(chunks) => <p>{chunks}</p>}
                </FormattedMessage>
              </div>
              <div className={styles.accountUnblockDropDownContainer}>
                <button
                  className={"emailMeBtn"}
                  style={{ width: "100%", maxWidth: "350px" }}
                    onClick={handleEmailMe}
                  data-navelement="Signin-With-password"
                >
                  <div>{translate("Reset_Password")}</div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountUnblockUI;
