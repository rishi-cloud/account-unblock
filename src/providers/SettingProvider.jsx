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
    return { ...errorMessage, ...Messages };
  };

  useEffect(() => {
    const getSettings = async () => {
      try {
        const settingResponse = await axios.get(
          process.env.REACT_APP_SETTINGS_LINK
        );
        const localizedFileResponse = await axios.get(
          process.env.REACT_APP_CONTENT_LINK
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
    trackClickEvent("Failure-while-fetching-settings");
  }, []);

  return (
    <SettingContext.Provider value={{ setting, localizedContent }}>
      {props.children}
    </SettingContext.Provider>
  );
};

export { SettingProvider, SettingContext };
