import React, { useContext, useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { AccountContext } from "../providers/AccountContext";
import { AppContext } from "../providers/AppContext";
import { CommonDataContext } from "../providers/CommonDataContext";
import { validatePassword } from "../validator/PasswordValidator";
import { TrackingContext } from "../providers/TrackingProvider";
import { SettingContext } from "../providers/SettingProvider";
import Cookies from "universal-cookie";
import {
  TealiumTagKeyConstants,
  TealiumTagValueConstans,
} from "../constants/TealiumConstants";

export default function SignupContainer(props) {
  // Context Data
  const { utagData, setUtagData } = useContext(TrackingContext);
  const { SignupWithPassword, loginWithPassword } = useContext(AccountContext);
  const { connections, setLoginText } = useContext(CommonDataContext);
  const { trackClickEvent } = useContext(TrackingContext);
  const { setWhichPage } = useContext(AppContext);
  const { LoginForm, setLoginForm, LoginError, setLoginError } =
    useContext(CommonDataContext);
  const { setSignupText } = useContext(CommonDataContext);
  const { setting } = useContext(SettingContext);
  // Context Data

  // Initialized States
  const [optinFields, setOptinFields] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [passwordRules, setPasswordRules] = useState(null);
  const [showSignupForm, setShowSignupForm] = useState(true);
  const { SignupForm, setSignupForm } = useContext(CommonDataContext);
  const [PasswordPolicyState, setPasswordPolicyState] = useState({
    No_more_than_2_identical_characters_in_a_row: false,
    Special_characters: false,
    Lower_case_Upper_Case_Numbers: false,
    Length_Check: false,
    Non_empty_Password_Required: false,
    UpperCaseCheck: false,
    LowerCaseCheck: false,
    NumberCheck: false,
  });
  const [SignupError, setSignupError] = useState({
    email: "",
    isEmailError: "",
    databaseError: "",
    errorCode: "",
  });
  const [loader, setLoader] = useState(false);
  // Initialized States

  // Object Initialization
  const cookies = new Cookies();

  useEffect(() => {
    if (setting?.OptinFields) {
      setOptinFields(setting.OptinFields);
    }
  }, [setting]);
  const debounceSubmit = useCallback(
    debounce(() => {
      setSignupForm({
        ...SignupForm,
        isSubmitting: false,
      });
      setIsValid(false);
    }, 2000),
    []
  );
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const onBlur = (e) => {
    if (e.target.name === "email") {
      if (e.target.value && !validateEmail(e.target.value)) {
        setSignupError({
          ...SignupError,
          isEmailError: true,
          [e.target.name]: "Email_is_not_valid",
        });
      } else {
        setSignupError({
          ...SignupError,
          isEmailError: false,
          [e.target.name]: "",
        });
      }
    }
  };
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      SignupForm.email !== "" &&
      validateEmail(SignupForm.email) &&
      SignupForm.password !== "" &&
      SignupForm.confirmPassword !== "" &&
      SignupForm.password === SignupForm.confirmPassword &&
      isValid
    ) {
      setLoader(true);
      setSignupForm({
        ...SignupForm,
        isSubmitting: true,
      });
      try {
        trackClickEvent("submitting-for-signup");
        const res = await SignupWithPassword(
          SignupForm.email,
          SignupForm.password,
          optinFields
        );
        if (res.email) {
          await loginWithPassword(SignupForm.email, SignupForm.password);
        }
      } catch (e) {
        setErrorEmail(SignupForm.email);
        setSignupForm({
          ...SignupForm,
          email: "",
          password: "",
          confirmPassword: "",
          isSubmitting: false,
        });
        setIsValid(false);
        if (e.code === "invalid_signup") {
          setLoginText({
            title: "Looks_like_you_already_have_an_account",
            subtitle: "",
          });
          setLoginError({
            ...LoginError,
            databaseError: e.description,
            errorCode: "This_email_already_exists",
          });
          setLoginForm({
            ...LoginForm,
            email: SignupForm.email,
            password: "",
          });
          setWhichPage("login-page");
          trackClickEvent("User-Already-Registered");
        } else if (
          e.code === "extensibility_error" &&
          e.description ===
            "Denied user registration in Pre User Registration Hook"
        ) {
          setShowSignupForm(false);
          setSignupText({
            title: "We_are_sorry_but_we_could_not_create_your_account",
            subtitle: "we_cannot_create_an_account",
          });
          setSignupError({
            ...SignupError,
            databaseError: e.description,
            errorCode: "signUp.export_restriction",
          });
        } else {
          setSignupError({
            ...SignupError,
            databaseError: e.description,
            errorCode: e?.code ?? e?.message,
          });
          trackClickEvent("failure-at-signup");
        }
      }

      setLoader(false);
    }
  };
  const changePage = (e) => {
    const checkCookies = cookies.get("ua");
    trackClickEvent(e.target.getAttribute("data-navelement"));
    fireDifferentPageViewCall(TealiumTagValueConstans.LOGIN_PAGE_NAME);
    if (!checkCookies) {
      cookies.set("ua", { at: "password" }, { path: "/" });
    } else {
      cookies.set("ua", { ...checkCookies, at: "password" }, { path: "/" });
    }

    const currentCount = cookies.get("ua");
    console.log(currentCount);
    setLoginForm({ ...LoginForm, email: "", password: "" });
    setSignupForm({
      ...SignupForm,
      email: "",
      password: "",
      confirmPassword: "",
    });
    setSignupText({
      title: "Create_your_McAfee_account",
      subtitle:
        "Enter_your_email_address_set_password_and_well_get_your_account_created",
    });
    setWhichPage("login-page");
  };

  const onClick = (e) => {
    setPasswordRules(connections[0]);
  };
  const onChange = (e) => {
    if (e.target.name === "password" && passwordRules) {
      validatePassword(
        passwordRules,
        e.target.value,
        PasswordPolicyState,
        setPasswordPolicyState,
        setIsValid
      );
    } else {
      setSignupForm({
        ...SignupForm,
        [e.target.name]: e.target.value,
      });
    }

    onBlur(e);
  };
  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setWhichPage("forgotPassword-page");
  };

  const handleOptinsCheckBoxes = (optinField) => {
    setOptinFields((prevOptingSettings) => {
      const newOptingSettings = { ...prevOptingSettings };
      newOptingSettings[optinField].checked =
        newOptingSettings[optinField].checked === "false" ? "true" : "false";
      return newOptingSettings;
    });
  };

  const child = React.Children.only(props.children);
  return React.cloneElement(child, {
    onSubmit,
    SignupForm,
    onChange,
    onClick,
    passwordRules,
    PasswordPolicyState,
    isValid,
    SignupError,
    loader,
    setLoginForm,
    LoginForm,
    changePage,
    showSignupForm,
    errorEmail,
    handleForgotPasswordClick,
    handleOptinsCheckBoxes,
    optinFields,
    validateEmail,
  });
}
