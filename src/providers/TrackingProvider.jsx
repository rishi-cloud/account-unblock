import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TealiumTagKeyConstants } from "../constants/TealiumConstants";
import Cookies from "universal-cookie";

const TrackingContext = React.createContext({});

const populateTealiumData = (props, location) => {
  return {
    ...window.utag_data,
    ...(props.config && {
      [TealiumTagKeyConstants.TEALIUM_CLIENT_ID]: props.config.clientName,
    }),
    // [TealiumTagKeyConstants.TEALIUM_CLIENT_ID]: props.config.clientName,
    [TealiumTagKeyConstants.TEALIUM_CULTURE_CODE]: getCulture(location),
  };
};

const getCulture = (location) => {
  const parsedHash = new URLSearchParams(window.location.hash.substr(1));
  let query = new URLSearchParams(location);
  let culture = query.get("culture") ?? parsedHash.get("culture");
  return culture;
};

const TrackingProvider = (props) => {
  const cookies = new Cookies();
  cookies.set("ua", { at: "password" }, { path: "/" });
  const location = useLocation().search;
  const [utagData, setUtagData] = useState(
    populateTealiumData(props, location)
  );
  const trackClickEvent = (navElement) => {
    let utag = window.utag;
    let updatedUtagData = { ...utagData };
    updatedUtagData["tm_global_tealium_calltype"] = "manual";
    updatedUtagData["tm_global_navigation_element"] = navElement;
    updatedUtagData["tm_global_navigation_element_click"] = "true";
    utag?.link(updatedUtagData);
  };
  const onClickTracker = (e) => {
    if (e.target.id) {
      console.log("now only", e.target.id);
      trackClickEvent(e.target.id);
    }
  };
  useEffect(() => {
    window.addEventListener("click", onClickTracker);
    return () => {
      window.removeEventListener("click", onClickTracker);
    };
  }, []);

  return (
    <TrackingContext.Provider
      value={{ trackClickEvent, utagData, setUtagData }}
    >
      {props.children}
    </TrackingContext.Provider>
  );
};

export { TrackingProvider, TrackingContext };
