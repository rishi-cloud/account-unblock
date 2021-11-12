import React, { useRef } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Authorize from "./components/Authorize";

import Main from "./Main";
import "./app.css";
import Footer from "./components/Footer/Footer";
import ResetPassword from "./components/reset-password";

import { AccountProvider } from "./providers/AccountContext";
import LanguageProvider from "./localization/languageProvider";
import { LOCALES } from "./localization/constants";
import { CommonDataProvider } from "./providers/CommonDataContext";

import "./app.css";
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

  if (lang === "en-us") {
    locale.current = LOCALES.ENGLISH;
  } else if (lang === "fr-ca") {
    locale.current = LOCALES.FRENCH;
  } else {
    locale.current = "en-us";
  }

  const attachAccountProvider = (Component) => {
    return <AccountProvider config={pageConfig}>{Component}</AccountProvider>;
  };

  return (
    <TrackingProvider config={pageConfig}>
      <SettingProvider>
        <CommonDataProvider
          config={pageConfig}
          passwordResetConfig={passwordResetConfig}
        >
          <AppProvider>
            <LanguageProvider locale={locale.current}>
              <div className="Page-Container">
                <div className="Content-Wrap">
                  <div id="app" className="d-flex flex-column h-100">
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
