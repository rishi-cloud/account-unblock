import React, { useContext, useEffect } from "react";
import SignupContainer from "../../containers/signupContainer";
import SignupUI from "./SignupUI";
import {
  TealiumTagKeyConstants,
  TealiumTagValueConstans,
} from "../../constants/TealiumConstants";
import { TrackingContext } from "../../providers/TrackingProvider";
import { SettingContext } from "../../providers/SettingProvider";

const Signup = (props) => {
  return (
    <SignupContainer {...props}>
      <SignupUI />
    </SignupContainer>
  );
};
export default Signup;
