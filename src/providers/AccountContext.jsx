import React, { useState } from "react";
import auth0 from "auth0-js";

const AccountContext = React.createContext({});

const AccountProvider = (props) => {
  const { locale } = props;
  const [isAuthenticated, setIsAuth] = useState(false);

  const AuthenticateUser = (authToken) => {
    localStorage.setItem("auth_token", authToken);
    setIsAuth(true);
  };

  const storeUserData = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
  };
  console.log("configs", props);
  const webAuth = new auth0.WebAuth({
    domain: props.config.auth0Domain,
    clientID: props.config.clientID,
    redirectUri: props.config.callbackURL,
    responseType: props.config.extraParams.response_type,
    scope: props.config.extraParams.scope,
    state: props.config.extraParams.state,
    nonce: props.config.extraParams.nonce,
    _csrf: props.config.extraParams._csrf,
    audience: props.config.extraParams.audience,
    overrides: { __tenant: props.config.auth0Tenant },
  });
  // const webAuth = new auth0.WebAuth({
  //   domain: process.env.REACT_APP_AUTH0_DOMAIN,
  //   clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  //   responseType: "token id_token",
  //   redirectUri: "http://localhost:4040/authorize",
  // });
  const getSocialLogin = (name) => {
    return new Promise((resolve, reject) => {
      webAuth.authorize(
        {
          connection: name,
        },
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  };

  const SignupWithPassword = (email, password, optinFields) => {
    const userMetadata = {
      lang: locale,
    };
    return new Promise((resolve, reject) => {
      const variables = {
        // connection: "AV-Password-Authentication",
        connection: "Test-CustomDB",
        // connection: "Username-Password-Authentication",
        email,
        password,
        ...{ optinFields: optinFields },
        userMetadata,
      };
      webAuth.signup(variables, (err, authResult) => {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }
        if (authResult) {
          window.origin = window.location.origin;
          resolve(authResult);
        }
      });
    });
  };

  const otpStart = (email) => {
    return new Promise((resolve, reject) => {
      const variables = {
        email,
        connection: "email",
        send: "code",
        xRequestLanguage: props.locale,
      };
      webAuth.passwordlessStart(variables, (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };

  const otpLogin = (email, otp) => {
    return new Promise((resolve, reject) => {
      webAuth.passwordlessLogin(
        { email, connection: "email", verificationCode: otp },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            window.origin = window.location.origin;
            resolve(res);
          }
        }
      );
    });
  };

  const loginWithPassword = (username, password) => {
    return new Promise((resolve, reject) => {
      webAuth.login(
        {
          // realm: "AV-Password-Authentication",
          realm: "Test-CustomDB",
          // realm: "Username-Password-Authentication",
          username,
          password,
          onRedirecting: function (done) {
            done();
          },
        },
        (err, authResult) => {
          if (err) {
            console.log(err);
            reject(err);
            return;
          }
          if (authResult) {
            window.origin = window.location.origin;
            console.log(authResult);
            resolve(authResult);
          }
        }
      );
    });
  };

  const sendForgotPasswordLink = (email) => {
    return new Promise((resolve, reject) => {
      webAuth.changePassword(
        {
          // connection: "AV-Password-Authentication",
          // connection: "Username-Password-Authentication",
          connection: "Test-CustomDB",
          email: email,
        },
        (err, authResult) => {
          if (err) {
            console.log(err);
            reject(err);
            return;
          }
          if (authResult) {
            window.origin = window.location.origin;
            resolve(authResult);
          }
        }
      );
    });
  };

  return (
    <AccountContext.Provider
      value={{
        webAuth,
        otpStart,
        otpLogin,
        loginWithPassword,
        SignupWithPassword,
        AuthenticateUser,
        storeUserData,
        isAuthenticated,
        getSocialLogin,
        sendForgotPasswordLink,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { AccountProvider, AccountContext };
