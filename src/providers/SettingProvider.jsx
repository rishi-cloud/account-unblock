import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TrackingContext } from "./TrackingProvider";

const SettingContext = React.createContext({});

const SettingProvider = (props) => {
  const [setting, setSetting] = useState(null);
  const [localizedContent, setLocalizedContent] = useState(null);
  const { trackClickEvent } = useContext(TrackingContext);
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
        console.log("localized", localizedFileResponse);
        setSetting(settingResponse);
        setLocalizedContent(localizedFileResponse);
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
