import React, { Fragment, useContext } from "react";
import { IntlProvider } from "react-intl";
import { SettingContext } from "../providers/SettingProvider";

import messages from "./messages";

const LanguageProvider = ({ children, locale }) => {
  const { localizedContent } = useContext(SettingContext);
  console.log("localized content", localizedContent);

  return (
    <IntlProvider
      textComponent={Fragment}
      locale={locale}
      // messages={localizedContent ? localizedContent : messages["en-demo-us"]}
      messages={messages[locale]}
    >
      {children}
    </IntlProvider>
  );
};
export default LanguageProvider;
