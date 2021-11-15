import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BrowserRouter as Router } from "react-router-dom";
import { CommonDataProvider } from "../../../providers/CommonDataContext";
import { AppProvider } from "../../../providers/AppContext";
import LanguageProvider from "../../../localization/languageProvider";
import { AccountProvider } from "../../../providers/AccountContext";
import { TrackingProvider } from "../../../providers/TrackingProvider";
import { SettingProvider } from "../../../providers/SettingProvider";

// import axios from "axios";
import SignupUI from "../SignupUI";
import SignupContainer from "../../../containers/signupContainer";

beforeAll(() => {
  console.log = () => {};
});

jest.mock("axios");

const setUp = (props) => {
  render(
    <Router>
      <TrackingProvider config={props.pageConfig}>
        <SettingProvider config={props.locale.current}>
          <CommonDataProvider config={props.pageConfig}>
            <AppProvider>
              <LanguageProvider locale={props.locale.current}>
                <AccountProvider
                  config={props.pageConfig}
                  locale={props.locale.current}
                >
                  <SignupContainer {...props}>
                    <SignupUI />
                  </SignupContainer>
                </AccountProvider>
              </LanguageProvider>
            </AppProvider>
          </CommonDataProvider>
        </SettingProvider>
      </TrackingProvider>
    </Router>
  );
};

describe("<SignUp/>", () => {
  const props = {
    locale: { current: "en-us" },
    pageConfig: {
      auth0Domain: "test-auth0Domain",
      clientID: "test-clientID",
      callbackURL: "test-callbackURL",
      auth0Tenant: "test-auth0Tenant",
      extraParams: {
        response_type: "test-response_type",
        scope: "test-scope",
        state: "test-state",
        nonce: "test-nonce",
        _csrf: "test-_csrf",
        audience: "test-audience",
      },
    },
  };
  test("should check if the signup component is rendered properly", () => {
    setUp(props);
    const signupScreenText = screen.getByText("Create your McAfee account");
    expect(signupScreenText).toBeInTheDocument();
  });
  test("should check if the signup component sub-heading is rendered properly", () => {
    setUp(props);
    const signupScreenText = screen.getByText(
      "Enter your email address, set a password and we’ll create your account."
    );
    expect(signupScreenText).toBeInTheDocument();
  });
  test("should check if the signup component Login page link is rendered properly", () => {
    setUp(props);
    const signupScreenText = screen.getByText("Sign in now");
    expect(signupScreenText).toBeInTheDocument();
  });
  test("should check if the signup form email field is rendered properly", () => {
    setUp(props);
    const signupScreenText = screen.getByPlaceholderText("Email");
    expect(signupScreenText).toBeInTheDocument();
  });
  test("should check if the signup form password field is rendered properly", () => {
    setUp(props);
    const signupScreenText = screen.getByPlaceholderText("Password");
    expect(signupScreenText).toBeInTheDocument();
  });
  test("should check if the signup form confirm password field is rendered properly", () => {
    setUp(props);
    const signupScreenText = screen.getByPlaceholderText("Confirm password");
    expect(signupScreenText).toBeInTheDocument();
  });
  test("should check if the signup form submit button is rendered properly", () => {
    setUp(props);
    const signupScreenText = screen.getByText("Create my Account");
    expect(signupScreenText).toBeInTheDocument();
  });
});

describe("Signup Form testing", () => {
  const props = {
    locale: { current: "en-us" },
    pageConfig: {
      auth0Domain: "test-auth0Domain",
      clientID: "test-clientID",
      callbackURL: "test-callbackURL",
      auth0Tenant: "test-auth0Tenant",
      extraParams: {
        response_type: "test-response_type",
        scope: "test-scope",
        state: "test-state",
        nonce: "test-nonce",
        _csrf: "test-_csrf",
        audience: "test-audience",
      },
    },
  };
  test("should check if email field value is updated", () => {
    setUp(props);
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, {
      target: { value: "test-email@dispostable.com" },
    });
    expect(
      screen.getByDisplayValue("test-email@dispostable.com")
    ).toBeInTheDocument();
  });
  test("should check if Password field value is updated", () => {
    setUp(props);
    const emailInput = screen.getByPlaceholderText("Password");
    fireEvent.change(emailInput, {
      target: { value: "Mcafee123" },
    });
    expect(screen.getByDisplayValue("Mcafee123")).toBeInTheDocument();
  });
  test("should check if Confirm password field value is updated", () => {
    setUp(props);
    const emailInput = screen.getByPlaceholderText("Confirm password");
    fireEvent.change(emailInput, {
      target: { value: "Mcafee123" },
    });
    expect(screen.getByDisplayValue("Mcafee123")).toBeInTheDocument();
  });
});
