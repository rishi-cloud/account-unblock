import React, { Fragment, useContext } from "react";
import { IntlProvider } from "react-intl";
import { SettingContext } from "../providers/SettingProvider";

import messages from "./messages";

const LanguageProvider = ({ children, locale }) => {
  const { localizedContent } = useContext(SettingContext);
  console.log(localizedContent);
  return (
    <IntlProvider
      textComponent={Fragment}
      locale="en-demo-us"
      messages={localizedContent ? localizedContent : messages["en-demo-us"]}
      // messages={messages["en-demo-us"]}
    >
      {children}
    </IntlProvider>
  );
};
export default LanguageProvider;
