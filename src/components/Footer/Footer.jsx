import React, { useContext } from "react";
import styles from "./Footer.module.css";
import translate from "../../localization/translate";
import { CommonDataContext } from "../../providers/CommonDataContext";
const Footer = () => {
  const { locale } = useContext(CommonDataContext);
  return (
    <div className={styles.FooterContainer}>
      <div className={styles.FooterLeftWrapper}>
        <div className={styles.FooterLinkContainer}>
          <a
            target="_blank"
            href={`https://home.mcafee.com/root/support.aspx?culture=${locale.toUpperCase()}`}
          >
            {translate("contactUs")}
          </a>
        </div>
        <div className={styles.FooterLinkContainer}>
          {" "}
          <a
            target="_blank"
            href={`https://www.mcafee.com/legal?culture=${locale.toUpperCase()}&affid=916#privacytop`}
          >
            {" "}
            {translate("privacyNotice")}
          </a>
        </div>
        <div className={styles.FooterLinkContainer}>FAQs </div>
      </div>
      <div className={styles.FooterRightWrapper}>
        <div>{translate("Copyright_Text")}</div>
      </div>
    </div>
  );
};
export default Footer;
