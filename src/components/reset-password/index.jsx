import React from "react";
import ResetPasswordUI from "./ResetPasswordUI";
import ResetPasswordContainer from "../../containers/ResetPasswordContainer";

function ResetPassword(props) {
  return (
    <ResetPasswordContainer {...props}>
      <ResetPasswordUI />
    </ResetPasswordContainer>
  );
}

export default ResetPassword;
