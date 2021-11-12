import React from "react";
import styles from "./Footer.module.css";
import translate from "../../localization/translate";
const Footer = () => {
  return (
    <div className={styles.FooterContainer}>
      <div className={styles.FooterLeftWrapper}>
        <div className={styles.FooterLinkContainer}>
          {translate("contactUs")}
        </div>
        <div className={styles.FooterLinkContainer}>
          {" "}
          {translate("privacyNotice")}
        </div>
        <div className={styles.FooterLinkContainer}>FAQs </div>
      </div>
      <div className={styles.FooterRightWrapper}>
        <div> Copyright &copy;{new Date().getFullYear()} McAfee , LLC</div>
      </div>
    </div>
  );
};
export default Footer;
