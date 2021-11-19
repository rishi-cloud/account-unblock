import React, { useRef } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Authorize from "./components/Authorize";

import Main from "./Main";

import Footer from "./components/Footer/Footer";
import ResetPassword from "./components/reset-password";

import { AccountProvider } from "./providers/AccountContext";
import LanguageProvider from "./localization/languageProvider";
import { LOCALES } from "./localization/constants";
import { CommonDataProvider } from "./providers/CommonDataContext";

import styles from "./app.module.css";
import { AppProvider } from "./providers/AppContext";
import { SettingProvider } from "./providers/SettingProvider";
import { TrackingProvider } from "./providers/TrackingProvider";
import { ResetPasswordProvider } from "./providers/ResetPasswordContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const App = ({ pageConfig, passwordResetConfig }) => {
  const parsedHash = new URLSearchParams(window.location.hash.substr(1));

  let query = useQuery();
  let locale = useRef("");
  const affiliateId = useRef(query.get("aff_id") || parsedHash.get("aff_id"));
  let email = useRef("");
  email.current = query.get("email") ? parsedHash.get("email") : "";
  let lang;
  let culture = query.get("culture") ?? parsedHash.get("culture");

  if (culture === null) {
    if (localStorage.getItem("lang") === null) {
      lang = "en-us";
    } else {
      lang = localStorage.getItem("lang");
    }
  } else {
    lang = culture;
    localStorage.setItem("lang", lang);
  }

  if (lang) {
    locale.current = lang;
  } else {
    locale.current = "en-us";
  }

  const attachAccountProvider = (Component) => {
    return <AccountProvider config={pageConfig}>{Component}</AccountProvider>;
  };

  return (
    <TrackingProvider config={pageConfig}>
      <SettingProvider
        locale={locale.current}
        affiliateId={affiliateId.current}
      >
        <CommonDataProvider
          config={pageConfig}
          passwordResetConfig={passwordResetConfig}
          email={email.current}
          locale={locale.current}
        >
          <AppProvider>
            <LanguageProvider locale={locale.current}>
              <div className={styles.PageContainer}>
                <div className={styles.ContentWrap}>
                  <div id="app">
                    <Switch>
                      <Route path="/login" exact>
                        {attachAccountProvider(<Main />)}
                      </Route>
                      <Route exact path="/authorize">
                        {attachAccountProvider(
                          <Authorize config={pageConfig} />
                        )}
                        <Authorize config={pageConfig} />
                      </Route>
                      <Route path="/lo/reset" exact>
                        <ResetPasswordProvider>
                          <ResetPassword />
                        </ResetPasswordProvider>
                      </Route>
                    </Switch>
                  </div>
                </div>
                <Footer />
              </div>
            </LanguageProvider>
          </AppProvider>
        </CommonDataProvider>
      </SettingProvider>
    </TrackingProvider>
  );
};

export default App;
