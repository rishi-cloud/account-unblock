import React, { useContext } from "react";
import translate from "../../localization/translate";
import { FormattedMessage } from "react-intl";
import "./style.css";
import { CommonDataContext } from "../../providers/CommonDataContext";

function ForgotPasswordEmail(props) {
  const { backToSignIn, updateEmailDetails, emailDetails } = props;
  const { locale } = useContext(CommonDataContext);
  const {isAffiliateLogo} = useContext(CommonDataContext);
  const FORMATVALUES = {
    a_contact_support: (chunks) => (
      <a
        className="contactSupportBtn"
        target="_blank"
        href={`https://home.mcafee.com/root/support.aspx?culture=${locale.toUpperCase()}`}
      >
        {chunks}
      </a>
    ),
    a_request_another_mail: (chunks) => (
      <strong
        className="contactSupportBtn"
        onClick={() => {
          updateEmailDetails({ ...emailDetails, emailSent: false });
        }}
      >
        {chunks}
      </strong>
    ),
  };
  return (
    <div className="ForgotPasswordContainer">
      <div className="ForgotPasswordLeftWrapper flexGrow limitWidth">
        <div className="ForgotPasswordLeftContainer" style={{ height: "100%" }}>
          <div>
          {isAffiliateLogo?
                (<div class="container-header">
                <span class="container-logo" >
                    <img  alt="McAfee" title="McAfee" src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-odrplat-auth0-ui/public/images/McAfee-Document-Logo1.png" class="logo"/>
                </span>
                    <span class="container-logo aff-logo-container">
                        <span class="logo-seperator">| </span><img  alt="McAfee" title="Dell" src="https://secureimages.mcafee.com/common/affiliateImages/dell/logo_dell_new_58x59.gif" width="20" 
                height="20"/>
                    </span>
            </div>): (<img
              alt="McAfeeLogo"
              className="McAfeeLogo"
              src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-React-Appp/public/images/McAfee-Logo.png"
            />)}
          </div>
          <div className="ForgotPasswordIntro">{translate("Check_inbox")}</div>
          <div className="ForgotPasswordIntroSubHeading">
            {translate("Password_reset_link_sent")}
          </div>
          <div className="forgotPasswordDropDownContainer">
            <button
              className={"emailMeBtn"}
              style={{ width: "100%", maxWidth: "350px" }}
              onClick={backToSignIn}
              data-navelement="Signin-With-password"
            >
              <div>{translate("Back_to_signin")}</div>
            </button>
            <div className="contactSupportWrapper">
              <FormattedMessage
                id="Didn't_receive_reset_password_link"
                defaultMessage={
                  "If you didn't receive a link, check your spam folder or <a_request_another_mail>request another email</a_request_another_mail>. Forgot which email you used or need help? <a_contact_support>Contact Support</a_contact_support>"
                }
                values={{
                  ...FORMATVALUES,
                  a: (chunks) => (
                    <a
                      className="contactSupportBtn"
                      target="_blank"
                      href="https://www.example.com/shoe"
                      data-nav-element-click="contact-us"
                    >
                      {chunks}
                    </a>
                  ),
                }}
              >
                {(chunks) => <p className="contactSupportText">{chunks}</p>}
              </FormattedMessage>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordEmail;
