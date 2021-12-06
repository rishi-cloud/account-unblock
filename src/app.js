import React, { useRef } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Authorize from "./components/Authorize";

import Main from "./Main";

import Footer from "./components/Footer/Footer";
import ResetPassword from "./components/reset-password";

import { AccountProvider } from "./providers/AccountContext";
import LanguageProvider from "./localization/languageProvider";
// import { LOCALES } from "./localization/constants";
import { CommonDataProvider } from "./providers/CommonDataContext";

import styles from "./app.module.css";
import { AppProvider } from "./providers/AppContext";
import { SettingProvider } from "./providers/SettingProvider";
import { TrackingProvider } from "./providers/TrackingProvider";
import { ResetPasswordProvider } from "./providers/ResetPasswordContext";
import { useEmail } from "./utils/useEmail";
import { useLocale } from "./utils/useLocale";
import { useAffId } from "./utils/useAffId";

const App = ({ pageConfig, passwordResetConfig }) => {
  const [emailFill] = useEmail();
  const [appLocale] = useLocale();
  const [affId] = useAffId();

  const withAccountProvider = (Component) => {
    return (
      <AccountProvider config={pageConfig} locale={appLocale}>
        {Component}
      </AccountProvider>
    );
  };

  return (
    <TrackingProvider config={pageConfig} affiliateId={affId}>
      <SettingProvider locale={appLocale} affiliateId={affId}>
        <CommonDataProvider
          config={pageConfig}
          passwordResetConfig={passwordResetConfig}
          email={emailFill}
          locale={appLocale}
        >
          <AppProvider>
            <LanguageProvider locale={appLocale}>
              <div className={styles.PageContainer}>
                <div className={styles.ContentWrap}>
                  <div id="app">
                    <Switch>
                      <Route path="/login" exact>
                        {withAccountProvider(<Main />)}
                      </Route>
                      <Route exact path="/authorize">
                        {withAccountProvider(<Authorize config={pageConfig} />)}
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
