import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TrackingContext } from "./TrackingProvider";

const SettingContext = React.createContext({});

const SettingProvider = (props) => {
  const [setting, setSetting] = useState(null);
  const [localizedContent, setLocalizedContent] = useState(null);
  const { trackClickEvent } = useContext(TrackingContext);
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
    console.log("finalMessage", { ...errorMessage, ...Messages });
    return {
      ...errorMessage,
      ...Messages,
      "passwordless.invalid_user_password":
        "We couldn’t sign you with this passcode. <rotp>Try again or resend code.</rotp>",
      "passwordless.access_denied":
        "We couldn’t sign you with this passcode. <rotp>Try again or resend code.</rotp>",
      Need_help: "Need help?",
      "passwordless.passcode_lock":
        "For your security, passcode sign in for <b>{email}</b> has been locked due to too many sign in attempts.",
    };
  };

  useEffect(() => {
    const getSettings = async () => {
      try {
        const settingResponse = await axios.get(
          `https://d1aza67fhfglew.cloudfront.net/settings/${props.locale}.json`
        );
        const localeForMessageLink =
          props?.locale.slice(0, -2) +
          props?.locale[props?.locale.length - 2].toUpperCase() +
          props?.locale[props?.locale.length - 1].toUpperCase();
        const localizedFileResponse = await axios.get(
          `https://d1aza67fhfglew.cloudfront.net/content/${localeForMessageLink}/messages.json`
        );
        console.log("settings", settingResponse);
        setSetting(settingResponse);
        setLocalizedContent(
          ExtractingLocalizedContent(localizedFileResponse.data)
        );
      } catch (err) {
        console.log(err);
      }
    };
    getSettings();
  }, [props?.locale]);

  return (
    <SettingContext.Provider value={{ setting, localizedContent }}>
      {props.children}
    </SettingContext.Provider>
  );
};

export { SettingProvider, SettingContext };
