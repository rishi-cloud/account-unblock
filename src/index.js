import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

import "./index.css";

// window.LoginWidget = class LoginWidget {
//     init(opts) {
//         const pageConfig = opts.pageConfig;
//         if (!pageConfig) {
//             console.log("hello");
//             throw new Error("pageConfig must be provided in opts");
//         }
//     }
// };

import { BrowserRouter } from "react-router-dom";

window.LoginWidget = class LoginWidget {
  init(opts) {
    const pageConfig = opts.pageConfig;
    if (!pageConfig) {
      throw new Error("pageConfig must be provided in opts");
    }

    ReactDOM.render(
      <BrowserRouter>
        <App pageConfig={pageConfig} />
      </BrowserRouter>,
      document.getElementById("root")
    );
  }
};

// new window.LoginWidget().init({
//   pageConfig: {
//     auth0Domain: "mcafee-mpc.us.auth0.com",
//     clientID: "6WH8NFEgHi9gcCfzVS78fZRmR54DeNS4",
//   },
// });

window.PasswordResetWidget = class PasswordResetWidget {
  init(opts) {
    console.log("locally: rishi singhal");
    console.log(opts);
    const passwordResetConfig = opts.passwordResetConfig;
    if (!passwordResetConfig) {
      throw new Error("passwordResetConfig must be provided in opts");
    }

    ReactDOM.render(
      <BrowserRouter>
        <App passwordResetConfig={passwordResetConfig} />
      </BrowserRouter>,
      document.getElementById("root")
    );
  }
};
// new window.PasswordResetWidget().init(
//   {
//     passwordResetConfig:{
//       csrfToken: "custom-token",
//       email: "custom-email",
//       tenantName: "custom-domain",
//       ticket: "8nfPeX3z5M8Ybm0Fd0N5Bff9hSm9gSsc"
//     }
//   }
// )
