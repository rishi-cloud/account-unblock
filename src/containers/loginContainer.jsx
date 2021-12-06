import React, { useContext, useState } from "react";
import { AccountContext } from "../providers/AccountContext";
import { CommonDataContext } from "../providers/CommonDataContext";
import validateEmail from "../utils/validateEmail";

import { AppContext } from "../providers/AppContext";
import {
  TealiumTagKeyConstants,
  TealiumTagValueConstans,
} from "../constants/TealiumConstants";
import Cookies from "universal-cookie";
import { TrackingContext } from "../providers/TrackingProvider";

export default function LoginContainer(props) {
  const [loader, setLoader] = useState(false);
  const { loginWithPassword, otpLogin, otpStart, getSocialLogin } =
    useContext(AccountContext);
  const [otpValid, setOtpValid] = useState(true);
  const { LoginForm, setLoginForm, LoginError, setLoginError, customization } =
    useContext(CommonDataContext);
  const { trackClickEvent } = useContext(TrackingContext);
  // const [LoginError, setLoginError] = useState({
  //   email: "",
  //   isEmailError: "",
  //   databaseError: "",
  //   errorCode: "",
  // });
  const [onlyPasswordLock, setOnlyPasswordLock] = useState(false);
  const [onlyOTPLock, setOnlyOTPLock] = useState(false);
  const { utagData, setUtagData } = useContext(TrackingContext);
  const [TimerState, setTimer] = useState({
    minutes: 3,
    seconds: 0,
  });

  const [otpTimer, setOtpTimer] = useState(false);
  const [switchLogin, setToggle] = useState("login-with-password");

  const [Continue, setContinue] = useState(false);
  const [blockScreenState, setBlockScreenState] = useState({
    otpBlock: false,
    passwordBlock: false,
  });

  const [resendingCode, setResendingCode] = useState("");
  const [hideEmail, setHideEmail] = useState(false);
  const { setWhichPage } = useContext(AppContext);
  const { setLoginText } = useContext(CommonDataContext);
  const cookies = new Cookies();
  // cookies.set("ua", { at: "password" }, { path: "/" });
  const settingCookies = () => {
    console.log("---------->", cookies.get("ua"));
    const currentCount = cookies.get("ua");
    console.log(currentCount);
    if (currentCount && !currentCount?.lc) {
      cookies.set("ua", { ...currentCount, lc: 1 }, { path: "/" });
    } else {
      cookies.set(
        "ua",
        { ...currentCount, lc: currentCount?.lc + 1 },
        { path: "/" }
      );
    }
  };
  const handleClickResendCode = (e) => {
    const callGetOtp = () => {
      setResendingCode("sent");
      getOtp(e);
    };
    setResendingCode("sending");
    setTimeout(callGetOtp, 3000);
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

  const onToggle = (e) => {
    e.preventDefault();
    if (switchLogin === "login-with-otp") {
      setLoginText({
        title: "Sign_into_your_McAfee_account",
        subtitle: "choose_your_signIn_method_continue",
      });
      setOtpTimer(false);
      setHideEmail(false);
      setLoginForm({ ...LoginForm, otpAvailable: false, otp: "" });
      setToggle("login-with-password");
      // trackClickEvent(e.target.getAttribute("data-navelment"));
      trackClickEvent(e.target.getAttribute("data-navelement"));
      fireDifferentPageViewCall(TealiumTagValueConstans.LOGIN_PAGE_NAME);
      console.log("------------->login", utagData);
      const currentPage = cookies.get("ua");
      if (!currentPage) {
        cookies.set("ua", { at: "password" }, { path: "/" });
      } else {
        cookies.set("ua", { ...currentPage, at: "password" }, { path: "/" });
      }
      setOnlyOTPLock(false);
    } else if (switchLogin === "login-with-password") {
      setLoginText({
        title: "We_will_send_you_a_otp_title",
        subtitle: "We_will_send_you_a_otp_subtitle",
      });
      setToggle("login-with-otp");
      // trackClickEvent(e.target.id);
      trackClickEvent(e.target.getAttribute("data-navelement"));
      fireDifferentPageViewCall(TealiumTagValueConstans.OTP_PAGE_NAME);
      console.log("------------->otp", utagData);
      const currentPage = cookies.get("ua");
      if (!currentPage) {
        cookies.set("ua", { at: "otp" }, { path: "/" });
      } else {
        cookies.set("ua", { ...currentPage, at: "otp" }, { path: "/" });
      }
    }
    setLoginError({
      ...LoginError,
      email: "",
      databaseError: "",
      errorCode: "",
    });
    const currentPageCheck = cookies.get("ua");
    console.log(currentPageCheck);
  };

  // const getQueryCustomization = (location) => {
  //   const parsedHash = new URLSearchParams(window.location.hash.substr(1));
  //   let query = new URLSearchParams(location);
  //   let cc = query.get("cc") ?? parsedHash.get("cc");
  //   return cc;
  // }

  // const getClient = (location) => {
  // const parsedHash = new URLSearchParams(window.location.hash.substr(1));
  // let query = new URLSearchParams(location);
  // let client = query.get("client") ?? parsedHash.get("client");
  // return client;
  // }

  // const getClientCustomizations = (client)=> {
  // return possibleCustomizationPaths[client]
  // }

  // const possibleCustomizationPaths = {
  // 'O3UVxh3N5iBepGHU8DctBlUb3cIshpG8': require('../customization/O3UVxh3N5iBepGHU8DctBlUb3cIshpG8.json')
  // }

  // const location = useLocation().search;

  const onLoad = () => {
    console.log("onload executing");
    //setCustomizationData();
    //const client = getClient(location);
    // const clientCustomization = getClientCustomizations(client);
    //const queryCustomization=  JSON.parse(getQueryCustomization(location));
    setLoginForm({
      ...LoginForm,
      customizations:
        customization?.Login !== undefined ? customization.Login : "",
      //(queryCustomization !== undefined && queryCustomization?.Login !== undefined) ? queryCustomization.Login:((clientCustomization !== undefined && clientCustomization?.Login !== undefined) ? clientCustomization.Login:""),
    });
  };

  const onPressContinue = () => {
    setContinue(true);
  };
  const socialBtn = async (name) => {
    try {
      await getSocialLogin(name);
    } catch (err) {
      console.log(err);
    }
  };

  const onBlur = (e) => {
    if (e.target.name === "email") {
      if (e.target.value && !validateEmail(e.target.value)) {
        setLoginError({
          ...LoginError,
          isEmailError: true,
          [e.target.name]: "Email_is_not_valid",
        });
      } else {
        setLoginError({
          ...LoginError,
          isEmailError: false,
          [e.target.name]: "",
        });
      }
    }
  };
  const changePage = (e) => {
    trackClickEvent(e.target.getAttribute("data-navelement"));
    fireDifferentPageViewCall(TealiumTagValueConstans.SIGNUP_PAGE_NAME);
    setWhichPage("signup-page");
    setLoginText({
      title: "Sign_into_your_McAfee_account",
      subtitle: "choose_your_signIn_method_continue",
    });
    setLoginForm({
      ...LoginForm,
      email: LoginForm.isEmailPrefilled ? LoginForm.email : "",
      password: "",
      otp: "",
      otpAvailable: false,
      isSubmitting: false,
    });
    setLoginError({
      email: "",
      isEmailError: "",
      databaseError: "",
      errorCode: "",
    });

    const cookies = new Cookies();
    const checkCookies = cookies.get("ua");
    if (!checkCookies) {
      cookies.set("ua", { at: "signup" }, { path: "/" });
    } else {
      cookies.set("ua", { ...checkCookies, at: "signup" }, { path: "/" });
    }
    const currentCount = cookies.get("ua");
    console.log(currentCount);
  };

  const blockScreenToggle = (whichLink, element) => {
    if (whichLink === "with-password") {
      trackClickEvent(element.target.getAttribute("data-navelement"));
      fireDifferentPageViewCall(TealiumTagValueConstans.LOGIN_PAGE_NAME);
      setToggle("login-with-password");
      setLoginText({
        title: "Sign_into_your_McAfee_account",
        subtitle: "choose_your_signIn_method_continue",
      });
      setLoginError({
        ...LoginError,
        email: "",
        databaseError: "",
        errorCode: "",
      });
      setLoginForm({
        ...LoginForm,
        email: "",
        password: "",
        otpAvailable: false,
      });
      setOnlyPasswordLock(false);
    } else if (whichLink === "with-otp") {
      trackClickEvent(element.target.getAttribute("data-navelement"));
      fireDifferentPageViewCall(TealiumTagValueConstans.OTP_PAGE_NAME);
      setToggle("login-with-otp");
      setLoginText({
        title: "We_will_send_you_a_otp_title",
        subtitle: "We_will_send_you_a_otp_subtitle",
      });
      setLoginError({
        ...LoginError,
        email: "",
        databaseError: "",
        errorCode: "",
      });
      setLoginForm({
        ...LoginForm,
        email: "",
        password: "",
        otpAvailable: false,
      });
      setOnlyPasswordLock(false);
    } else if (whichLink === "both-locked") {
      trackClickEvent(element.target.getAttribute("data-navelement"));
      fireDifferentPageViewCall(TealiumTagValueConstans.LOGIN_PAGE_NAME);
      setToggle("login-with-password");
      setLoginText({
        title: "Sign_into_your_McAfee_account",
        subtitle: "choose_your_signIn_method_continue",
      });
      setLoginError({
        ...LoginError,
        email: "",
        databaseError: "",
        errorCode: "",
      });
      setLoginForm({
        ...LoginForm,
        email: "",
        password: "",
        otpAvailable: false,
        isSubmitting: false,
      });
      setHideEmail(false);
      setOnlyPasswordLock(false);
      setOnlyOTPLock(false);
      setBlockScreenState({
        otpBlock: false,
        passwordBlock: false,
      });
    } else if (whichLink === "with-otp-user-unlocked") {
      trackClickEvent(element.target.getAttribute("data-navelement"));
      fireDifferentPageViewCall(TealiumTagValueConstans.OTP_PAGE_NAME);
      setToggle("login-with-otp");
      setLoginText({
        title: "We_will_send_you_a_otp_title",
        subtitle: "We_will_send_you_a_otp_subtitle",
      });
      setLoginError({
        ...LoginError,
        email: "",
        databaseError: "",
        errorCode: "",
      });
      setLoginForm({
        ...LoginForm,
        email: "",
        password: "",
        otpAvailable: false,
      });
      setOnlyOTPLock(false);
    }
  };

  const onChange = (e) => {
    if (e.target.name === "otp") {
      const otpRegex = /^[0-9\b]+$/;
      if (
        (e.target.value === "" || otpRegex.test(e.target.value)) &&
        e.target.value.length <= 6
      ) {
        setLoginForm({
          ...LoginForm,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setLoginForm({
        ...LoginForm,
        [e.target.name]: e.target.value,
      });
    }

    onBlur(e);
  };

  const submitForLoginWithPassword = async () => {
    try {
      setLoader(true);

      const response = await loginWithPassword(
        LoginForm.email,
        LoginForm.password
      );
      setLoginError({
        ...LoginError,
        databaseError: "",
      });
      setLoginForm({
        ...LoginForm,
        isSubmitting: false,
      });
    } catch (err) {
      if (err.code === "too_many_attempts") {
        setBlockScreenState({
          ...blockScreenState,
          passwordBlock: true,
        });
        setOnlyPasswordLock(true);
        if (blockScreenState.otpBlock) {
          setLoginText({
            title: "login_lock_title",
            subtitle: "login_lock_subtitle",
          });
          setLoginError({
            ...LoginError,
            // databaseError: err?.description,
            // errorCode: err?.code === null ? err.original.message : err?.code,
            databaseError: "",
            errorCode: "",
          });
        } else {
          setLoginText({
            title: "You_have_reached_the_maximum_number_of_password_attempts",
            subtitle:
              "You_have_reached_the_maximum_number_of_password_attempts",
          });
          setLoginError({
            ...LoginError,
            // databaseError: err?.description,
            // errorCode: err?.code === null ? err.original.message : err?.code,
            databaseError: "Blocked user",
            errorCode: `login.password_lock`,
          });
        }
      } else {
        setToggle("login-with-password");
        if (!blockScreenState.otpBlock) {
          setLoginText({
            title: "Sign_into_your_McAfee_account",
            subtitle: "choose_your_signIn_method_continue",
          });
        }

        setLoginError({
          ...LoginError,
          databaseError: err?.description,
          errorCode:
            err?.code === null
              ? `login.${err.original.message}`
              : `login.${err?.code}`,
        });
      }
      setLoginForm({
        ...LoginForm,
        password: "",
        isSubmitting: false,
      });
      settingCookies();
      trackClickEvent("email-password-login-failure");
    }
    setLoader(false);
  };
  const submitForLoginWithOTP = async () => {
    try {
      if (LoginForm.otpAvailable) {
        trackClickEvent("submitting-for-otp-login");
        if (!otpValid) {
          setLoginForm({
            ...LoginForm,
            isSubmitting: false,
          });
          setLoginError({
            ...LoginError,
            databaseError: "Otp has expired please resend the otp",
            errorCode: "Otp has expired please resend the otp",
          });
        } else {
          setLoader(true);
          await otpLogin(LoginForm.email, LoginForm.otp);
          setLoginForm({
            ...LoginForm,
            isSubmitting: false,
          });
        }
      } else {
        await otpStart(LoginForm.email);
        trackClickEvent("reqesting-for-otp");
        setLoginText({
          title: "Welcome_back_to",
          subtitle: "We_sent_a_otp_to_email",
        });
        setOtpTimer(true);
        setLoginForm({
          ...LoginForm,
          isSubmitting: false,
        });
        setLoginForm({
          ...LoginForm,
          otpAvailable: true,
        });
        setHideEmail(true);
      }
    } catch (err) {
      if (err.code === "too_many_attempts") {
        setBlockScreenState({
          ...blockScreenState,
          otpBlock: true,
        });
        setOnlyOTPLock(true);
        if (blockScreenState.passwordBlock) {
          setLoginText({
            title: "login_lock_title",
            subtitle: "login_lock_subtitle",
          });
          setLoginError({
            ...LoginError,
            // databaseError: err?.description,
            // errorCode: err?.code === null ? err.original.message : err?.code,
            databaseError: "",
            errorCode: "",
          });
          setLoginForm({
            ...LoginForm,
            isSubmitting: false,
          });
        } else {
          setLoginText({
            title: "You_have_reached_the_maximum_number_of_passcode_attempts",
            subtitle:
              "You_have_reached_the_maximum_number_of_passcode_attempts",
          });
          setLoginError({
            ...LoginError,
            // databaseError: err?.description,
            // errorCode: err?.code === null ? err.original.message : err?.code,
            databaseError: "Blocked user",
            errorCode: "passwordless.passcode_lock",
          });
          setHideEmail(false);
          setLoginForm({
            ...LoginForm,
            password: "",
            otp: "",
            otpAvailable: false,
            isSubmitting: false,
          });
        }
      } else if (
        err.code === "extensibility_error" &&
        err.description === "Denied user registration as the user doesnt exist"
      ) {
        setLoginText({
          title: "We_will_send_you_a_otp_title",
          subtitle: "choose_your_signIn_method_continue",
        });
        //console.log("Wrong email credentials");
        setLoginError({
          ...LoginError,
          databaseError: `passwordless.${err?.description}`,
          errorCode: "sorry_no_account_found",
        });
        setLoginForm({
          ...LoginForm,
          password: "",
          otp: "",
          isSubmitting: false,
        });
      } else {
        console.log("errorcode", `passwordless.${err?.code}`);
        setLoginError({
          ...LoginError,
          databaseError: `passwordless.${err?.description}`,
          errorCode: `passwordless.${err?.code}` ?? err?.message,
        });
        setLoginForm({
          ...LoginForm,
          password: "",
          otp: "",
          isSubmitting: false,
        });
      }
      setOtpTimer(false);
      settingCookies();
      trackClickEvent("otp-login-failure");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoginForm({
      ...LoginForm,
      isSubmitting: true,
    });
    if (switchLogin === "login-with-password") {
      if (
        (validateEmail(LoginForm.email) && LoginForm.password !== "") ||
        LoginForm.isSubmitting
      ) {
        await submitForLoginWithPassword();
      }
    } else if (
      switchLogin === "login-with-otp" &&
      LoginError?.errorCode === "passwordless.passcode_lock"
    ) {
      if (
        (validateEmail(LoginForm.email) && LoginForm.password !== "") ||
        LoginForm.isSubmitting
      ) {
        await submitForLoginWithPassword();
      }
    } else {
      await submitForLoginWithOTP();
      setLoader(false);
    }
  };
  const getOtp = async (e) => {
    try {
      e.preventDefault();
      trackClickEvent("submitting-for-resend-otp");
      await otpStart(LoginForm.email);
      setTimer({
        minutes: 3,
        seconds: 0,
      });
      setOtpTimer(false);
      setOtpTimer(true);
      setOtpValid(true);
      setLoginError({
        ...LoginError,
        databaseError: "",
        errorCode: "",
      });
      setLoginForm({
        ...LoginForm,
        isSubmitting: false,
      });
    } catch (err) {
      trackClickEvent("resend-otp-failure");
      setLoginError({
        ...LoginError,
        databaseError: err?.description,
        errorCode: err?.code ?? err?.message,
      });
    }
  };
  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    trackClickEvent(e.target.getAttribute("data-navelement"));
    fireDifferentPageViewCall(
      TealiumTagValueConstans.FORGOT_PASSWORD_PAGE_NAME
    );
    setWhichPage("forgotPassword-page");
    setLoginForm({
      email: "",
      password: "",
      otp: "",
      otpAvailable: false,
      isSubmitting: false,
    });
    setLoginError({
      email: "",
      isEmailError: "",
      databaseError: "",
      errorCode: "",
    });
  };

  const child = React.Children.only(props.children);
  return React.cloneElement(child, {
    ...props,
    onChange,
    onToggle,
    switchLogin,
    onSubmit,
    LoginForm,
    LoginError,
    Continue,
    validateEmail,
    onPressContinue,
    getOtp,
    socialBtn,
    setHideEmail,
    loader,
    hideEmail,
    setOtpTimer,
    otpTimer,
    otpValid,
    setOtpValid,
    TimerState,
    setTimer,
    changePage,
    handleForgotPasswordClick,
    blockScreenToggle,
    blockScreenState,
    onlyPasswordLock,
    onlyOTPLock,
    resendingCode,
    handleClickResendCode,
    onLoad,
  });
}
