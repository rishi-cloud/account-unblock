/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { TrackingContext } from "./TrackingProvider";
import { useLocation } from "react-router-dom";

import axios from "axios";

const CommonDataContext = React.createContext({});

const CommonDataProvider = (props) => {
  // Initializing the states
  const [connections, setConn] = useState([]);
  const [locale, setLocale] = useState("en-us");
  const [passwordResetConfig, setPasswordResetConfig] = useState({});
  const [LoginText, setLoginText] = useState({
    title: "Sign_into_your_McAfee_account",
    subtitle: "choose_your_signIn_method_continue",
  });
  const [SignupText, setSignupText] = useState({
    title: "Create_your_McAfee_account",
    subtitle:
      "Enter_your_email_address_set_password_and_well_get_your_account_created",
  });
  const [LoginError, setLoginError] = useState({
    email: "",
    isEmailError: "",
    databaseError: "",
    errorCode: "",
  });
  const [LoginForm, setLoginForm] = useState({
    email: props.email || "",
    password: "",
    otp: "",
    otpAvailable: false,
    isSubmitting: false,
    customizations: "",
  });
  const [SignupForm, setSignupForm] = useState({
    email: props.email || "",
    password: "",
    confirmPassword: "",
    isSubmitting: false,
    customizations: "",
  });

  // Tracking Event function from Context
  const { trackClickEvent } = useContext(TrackingContext);

  const getCommonData = async () => {
    try {
      // `/client/soKVdT2wmzd71LKYoZpv6FJMTg6yQ238.js`
      const res = await axios.get(
        `https://${props.config.auth0Domain}/client/${props.config.clientID}.js`
      );
      const data = res.data;
      if (typeof data === "string") {
        const filteredData = data.slice(16, -2);
        const jsonData = JSON.parse(filteredData);
        const DB_ARRAY = jsonData?.strategies[0]?.connections.filter(
          (item) => item.name === "Test-CustomDB"
        );
        console.log("DB ARRAY RECIVED", DB_ARRAY);
        setConn(DB_ARRAY);
      }
    } catch (err) {
      trackClickEvent("Failure-while-fetching-password-policy");
      console.log(err);
    }
  };
  useEffect(() => {
    if (props.config) {
      setLocale(props?.locale);
      getCommonData();
    }
    if (props.passwordResetConfig)
      setPasswordResetConfig(props.passwordResetConfig);
  }, []);

  const location = useLocation().search;

  const [customization, setCustomizationData] = useState(
    populateCustomizationData(location)
  );
  const [isAffiliateLogo, setIsAffiliateLogo] = useState(
    getAffiliateLogo(location)
  );

  return (
    <CommonDataContext.Provider
      value={{
        connections,
        LoginText,
        setLoginText,
        LoginForm,
        setLoginForm,
        SignupText,
        setSignupText,
        SignupForm,
        setSignupForm,
        passwordResetConfig,
        locale,
        customization,
        isAffiliateLogo,
      }}
    >
      {props.children}
    </CommonDataContext.Provider>
  );
};

const populateCustomizationData = (location) => {
  const client = getClient(location);
  const clientCustomization = getClientCustomizations(client);
  const queryCustomization = JSON.parse(getQueryCustomization(location));
  const customization =
    queryCustomization !== null && queryCustomization !== undefined
      ? queryCustomization
      : clientCustomization !== null && clientCustomization !== undefined
      ? clientCustomization
      : "";
  return customization;
};

const getQueryCustomization = (location) => {
  const parsedHash = new URLSearchParams(window.location.hash.substr(1));
  let query = new URLSearchParams(location);
  let cc = query.get("cc") ?? parsedHash.get("cc");
  return cc;
};

const getClient = (location) => {
  const parsedHash = new URLSearchParams(window.location.hash.substr(1));
  let query = new URLSearchParams(location);
  let client = query.get("client") ?? parsedHash.get("client");
  return client;
};

const getClientCustomizations = (client) => {
  return possibleCustomizationPaths[client];
};

const possibleCustomizationPaths = {
  O3UVxh3N5iBepGHU8DctBlUb3cIshpG8: require("../customization/O3UVxh3N5iBepGHU8DctBlUb3cIshpG8.json"),
};

const getAffiliate = (location) => {
  const parsedHash = new URLSearchParams(window.location.hash.substr(1));
  let query = new URLSearchParams(location);
  let affiliate = query.get("affid") ?? parsedHash.get("affid");
  return affiliate;
};

const getCulture = (location) => {
  const parsedHash = new URLSearchParams(window.location.hash.substr(1));
  let query = new URLSearchParams(location);
  let culture = query.get("culture") ?? parsedHash.get("culture");
  return culture;
};

const possiblePaths = {
  "en-us": require("../customization/en-us.json"),
};

const getCultureSettingsFile = (culture) => {
  return possiblePaths[culture];
};

const getAffiliateLogo = (location) => {
  let isAffiliateLogoAvailable = false;
  const culture = getCulture(location);
  const affiliate = getAffiliate(location);
  if (culture) {
    const cultureSettings = getCultureSettingsFile(culture);
    if (
      cultureSettings &&
      affiliate &&
      cultureSettings.affiliates &&
      cultureSettings.affiliates[affiliate]
    )
      isAffiliateLogoAvailable =
        cultureSettings.affiliates[affiliate].affiliateLogo !== null
          ? cultureSettings.affiliates[affiliate].affiliateLogo
          : false;
    else if (cultureSettings && cultureSettings.affiliateLogo)
      isAffiliateLogoAvailable = cultureSettings.affiliateLogo;
  }
  return isAffiliateLogoAvailable;
};
export { CommonDataProvider, CommonDataContext };
