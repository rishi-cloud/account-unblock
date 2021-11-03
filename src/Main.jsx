import React, { useContext } from "react";
import { AppContext } from "./providers/AppContext";
import Login from "./components/login/index";
import Signup from "./components/signup/index";
import { CommonDataContext } from "./providers/CommonDataContext";
import Cookies from "universal-cookie/es6";
import { SettingContext } from "./providers/SettingProvider";
import CircularLoader from "./loader/CircularLoader";
import { ReactComponent as McAfeeLogo } from "./svg/Mcafee-Logo.svg";

function Main() {
  const { whichPage, setWhichPage } = useContext(AppContext);
  const { setting } = useContext(SettingContext);

  // return setting ? (
  return (
    <div>
      {whichPage === "signup-page" ? (
        <Signup setWhichPage={setWhichPage} />
      ) : (
        <Login setWhichPage={setWhichPage} />
      )}
    </div>
  );
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
