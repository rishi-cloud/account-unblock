import React from "react";
import LoginContainer from "../../containers/loginContainer";
import LoginUI from "./loginUi";

const Login = (props) => {
  return (
    <LoginContainer {...props}>
      <LoginUI />
    </LoginContainer>
  );
};
export default Login;
