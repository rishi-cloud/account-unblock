/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { TrackingContext } from "./TrackingProvider";

import axios from "axios";

const CommonDataContext = React.createContext({});

const CommonDataProvider = (props) => {
  // Initializing the states
  const [connections, setConn] = useState([]);
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
  const [LoginForm, setLoginForm] = useState({
    email: props.email || "",
    password: "",
    otp: "",
    otpAvailable: false,
    isSubmitting: false,
  });
  const [SignupForm, setSignupForm] = useState({
    email: props.email || "",
    password: "",
    confirmPassword: "",
    isSubmitting: false,
    isEmailDisable: props.email ? true : false,
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
    if (props.config) getCommonData();
    if (props.passwordResetConfig)
      setPasswordResetConfig(props.passwordResetConfig);
  }, []);
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
      }}
    >
      {props.children}
    </CommonDataContext.Provider>
  );
};

export { CommonDataProvider, CommonDataContext };
