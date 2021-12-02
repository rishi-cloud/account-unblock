import React, { useContext, useEffect } from "react";
import { AppContext } from "./providers/AppContext";
import Login from "./components/login/index";
import Signup from "./components/signup/index";
// import { CommonDataContext } from "./providers/CommonDataContext";
// import Cookies from "universal-cookie/es6";
import { SettingContext } from "./providers/SettingProvider";
import LoaderScreen from "./loader/LoaderScreen";
import { ReactComponent as McAfeeLogo } from "./svg/Mcafee-Logo.svg";
import ForgotPassword from "./components/forgot-password/index";
import translate from "./localization/translate";
import styles from "./app.module.css";
import {
  TealiumTagKeyConstants,
  TealiumTagValueConstans,
} from "./constants/TealiumConstants";
import { TrackingContext } from "./providers/TrackingProvider";

function Main() {
  const { whichPage, setWhichPage } = useContext(AppContext);
  const { setting, localizedContent } = useContext(SettingContext);
  const { utagData, setUtagData } = useContext(TrackingContext);
  const { affiliate_name } = useContext(SettingContext);

  console.log(affiliate_name);
  const SettingUtagData = () => {
    console.log("how many times");
    let utag = window.utag;
    let updatedUtagData;
    updatedUtagData = {
      ...utagData,
      [TealiumTagKeyConstants.TEALIUM_AFFILIATE_NAME]: affiliate_name,
      [TealiumTagKeyConstants.TEALIUM_PAGE_NAME]:
        TealiumTagValueConstans.LOGIN_PAGE_NAME,
      [TealiumTagKeyConstants.TEALIUM_SITESECTION]:
        TealiumTagValueConstans.LOGIN_PAGE_NAME,
    };
    utag.view({
      ...updatedUtagData,
      [TealiumTagKeyConstants.TEALIUM_PAGE_PUBLISH_DATE]: new Date(),
    });
    setUtagData(updatedUtagData);
  };

  useEffect(() => {
    if (affiliate_name) {
      SettingUtagData();
    }
  }, [affiliate_name]);

  const returnPage = (whichPage) => {
    // if (!setting && !localizedContent) {
    //   return <LoaderScreen text="" />;
    // } else {
    switch (whichPage) {
      case "signup-page":
        return <Signup setWhichPage={setWhichPage} />;
      case "login-page":
        return <Login setWhichPage={setWhichPage} />;
      case "forgotPassword-page":
        return <ForgotPassword setWhichPage={setWhichPage} />;
      default:
        return <Login setWhichPage={setWhichPage} />;
      // }
    }
  };

  return <div>{returnPage(whichPage)}</div>;

  // return setting ? (
  // return (
  //   <div>
  //     {whichPage === "signup-page" ? (
  //       <Signup setWhichPage={setWhichPage} />
  //     ) : (
  //       <Login setWhichPage={setWhichPage} />
  //     )}
  //   </div>
  // );
  // ) : (
  //   <div className="loaderWrapper">
  //     <div className="loaderLogo">
  //       <McAfeeLogo className="Logo" />
  //     </div>
  //     <div className="loader-creating-your-account">
  //       <img
  //         alt="McAfeeLogo"
  //         className="loading-logo"
  //         src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-odrplat-auth0-ui/public/images/McAfee-Document-Logo1.png"
  //       />
  //       <CircularLoader />
  //     </div>
  //   </div>
  // );
}

export default Main;
