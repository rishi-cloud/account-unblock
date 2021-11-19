import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TrackingContext } from "./TrackingProvider";
import settings from "../localization/settings";
const SettingContext = React.createContext({});

const SettingProvider = (props) => {
  const [setting, setSetting] = useState(null);
  const [localizedContent, setLocalizedContent] = useState(null);
  const { trackClickEvent } = useContext(TrackingContext);
  const [optinFields, setOptinFields] = useState();
  const ExtractingLocalizedContent = (jsonData) => {
    const errorMessage = {
      ...jsonData.error.login,
      ...jsonData.error.passwordless,
      ...jsonData.error.forgotPassword,
      ...jsonData.error.signUp,
    };

    const Messages = Object.keys(jsonData)
      .filter((key) => key !== "error")
      .reduce((obj, key) => {
        obj[key] = jsonData[key];
        return obj;
      }, {});
    // console.log("finalMessage", { ...errorMessage, ...Messages });
    return {
      ...errorMessage,
      ...Messages,
      "passwordless.invalid_user_password":
        "We couldn’t sign you with this passcode. <a_rotp>Try again or resend code.</a_rotp>",
      Need_help: "Need help?",
      "passwordless.passcode_lock":
        "For your security, passcode sign in for <b>{email}</b> has been locked due to too many sign in attempts.",
      Need_help: "Need help?",
      Contact_support: "Contact support",
      login_lock_title:
        "We’ve temporarily locked your account to protect your identity",
      login_lock_subtitle:
        "We sent an email to <b>{email}</b> to unlock your account. Or you can <a_reset_pass>reset your password</a_reset_pass> or <a_contact_support>Contact Support</a_contact_support> to verify your identity and unlock your account.",
      otp_lock_bottom_Message:
        "You may sign in with a password, try <a_reset_pass>resetting your password</a_reset_pass> or <a_contact_support>Contact Support.</a_contact_support>",

      optin_VirusThreats:
        "I want to receive information about the latest viruses(available in English only).",
      optin_SpecialPromo:
        " I would like to receive information about McAfee special offers.",
      optin_PartnerPromo:
        "I would like to receive information about special offers from McAfee partners.",
    };
  };

  useEffect(() => {
    const getSettings = async () => {
      try {
        // CDN is not working
        // const settingResponse = await axios.get(
        //   `"https://d1aza67fhfglew.cloudfront.net/settings/${props.locale}.json`
        // );
        const settingResponse = { data: settings[props.locale] };
        if (
          settingResponse.data?.affiliates &&
          typeof settingResponse.data.affiliates === "object"
        ) {
          setSetting(settingResponse.data.affiliates[props.affiliateId]);
        }
        const localeForMessageLink =
          props?.locale.slice(0, -2) +
          props?.locale[props?.locale.length - 2].toUpperCase() +
          props?.locale[props?.locale.length - 1].toUpperCase();
        const localizedFileResponse = await axios.get(
          `https://d1aza67fhfglew.cloudfront.net/content/${localeForMessageLink}/messages.json`
        );

        setLocalizedContent(
          ExtractingLocalizedContent(localizedFileResponse.data)
        );
      } catch (err) {
        console.log(err);
      }
    };
    getSettings();
  }, [props.affiliateId, props.locale]);

  return (
    <SettingContext.Provider value={{ setting, localizedContent, optinFields }}>
      {props.children}
    </SettingContext.Provider>
  );
};

export { SettingProvider, SettingContext };
