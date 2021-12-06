import React from "react";
import translate from "../localization/translate";
import CircularLoader from "./utils/CircularLoader/CircularLoader";
import styles from "./style.module.css";
import { ReactComponent as McAfeeLogo } from "../svg/Mcafee-Logo.svg";

function LoaderScreen(props) {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loaderLogo}>
        <McAfeeLogo className={styles.Logo} />
      </div>
      <div className={styles.loaderCreatingYourAccount}>
        <img
          alt="McAfeeLogo"
          className={styles.loadingLogo}
          src="https://cdn.jsdelivr.net/gh/atulrana007/McAfee-odrplat-auth0-ui/public/images/McAfee-Document-Logo1.png"
        />
        {props.text ? (
          <div className={styles.loadingText}>{translate(props.text)}</div>
        ) : null}
        <CircularLoader />
      </div>
    </div>
  );
}

export default LoaderScreen;
