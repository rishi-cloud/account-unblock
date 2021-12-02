import React, { useEffect, useContext } from "react";
import LoginContainer from "../../containers/loginContainer";
import LoginUI from "./loginUi";
import {
  TealiumTagKeyConstants,
  TealiumTagValueConstans,
} from "../../constants/TealiumConstants";
import { TrackingContext } from "../../providers/TrackingProvider";
import { SettingContext } from "../../providers/SettingProvider";

const Login = (props) => {
  return (
    <LoginContainer {...props}>
      <LoginUI />
    </LoginContainer>
  );
};
export default Login;
