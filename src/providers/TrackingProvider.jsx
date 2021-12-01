import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { TealiumTagKeyConstants } from "../constants/TealiumConstants";
import Cookies from "universal-cookie";
import { SettingContext } from "./SettingProvider";

const TrackingContext = React.createContext({});

const populateTealiumData = (props, location) => {
  return {
    ...window.utag_data,
    ...(props.config && {
      [TealiumTagKeyConstants.TEALIUM_CLIENT_ID]: props.config.clientName,
    }),
    // [TealiumTagKeyConstants.TEALIUM_CLIENT_ID]: props.config.clientName,
    [TealiumTagKeyConstants.TEALIUM_CULTURE_CODE]: getCulture(location),
    [TealiumTagKeyConstants.TEALIUM_AFFILIATE_ID]: props.affiliateId,
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
  console.log("at every stage", utagData);
  const fireDifferentPageViewCall = (pageName) => {
    let utag = window.utag;
    let updatedUtagData = {
      ...utagData,
      [TealiumTagKeyConstants.TEALIUM_NAVIGATION_ELEMENT]: null,
      [TealiumTagKeyConstants.TEALIUM_PAGE_NAME]: pageName,
      [TealiumTagKeyConstants.TEALIUM_SITESECTION]: pageName,
    };
    utag.view({
      ...updatedUtagData,
      [TealiumTagKeyConstants.TEALIUM_PAGE_PUBLISH_DATE]: new Date(),
    });
    setUtagData(updatedUtagData);
  };

  const trackClickEvent = (navElement) => {
    console.log(
      "inside this",
      utagData[TealiumTagKeyConstants.TEALIUM_PAGE_NAME]
    );
    let utag = window.utag;
    let updatedUtagData = {
      ...utagData,
      tm_global_tealium_calltype: "manual",
      tm_global_navigation_element: navElement,
      tm_global_navigation_element_click: "true",
      [TealiumTagKeyConstants.TEALIUM_PAGE_PUBLISH_DATE]: new Date(),
    };
    setUtagData(updatedUtagData);
    utag?.link(updatedUtagData);
  };

  useEffect(() => {
    const onClickTracker = (e) => {
      console.log("element", e.target.getAttribute("data-nav-element-click"));
      if (e.target.getAttribute("data-nav-element-click")) {
        console.log(
          "inside this",
          utagData[TealiumTagKeyConstants.TEALIUM_PAGE_NAME]
        );
        let utag = window.utag;
        let updatedUtagData = {
          ...utagData,
          tm_global_tealium_calltype: "manual",
          tm_global_navigation_element: e.target.getAttribute(
            "data-nav-element-click"
          ),
          tm_global_navigation_element_click: "true",
          [TealiumTagKeyConstants.TEALIUM_PAGE_PUBLISH_DATE]: new Date(),
        };
        setUtagData(updatedUtagData);
        utag?.link(updatedUtagData);
      }
    };
    window.addEventListener("click", onClickTracker);
    return () => {
      window.removeEventListener("click", onClickTracker);
    };
  }, [utagData]);

  return (
    <TrackingContext.Provider
      value={{
        trackClickEvent,
        utagData,
        setUtagData,
      }}
    >
      {props.children}
    </TrackingContext.Provider>
  );
};

export { TrackingProvider, TrackingContext };
