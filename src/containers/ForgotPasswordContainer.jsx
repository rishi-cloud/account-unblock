import React, { useState, useContext } from "react";
import { AccountContext } from "../providers/AccountContext";
import { AppContext } from "../providers/AppContext";
import { CommonDataContext } from "../providers/CommonDataContext";

function ForgotPasswordContainer(props) {
  const [emailDetails, updateEmailDetails] = useState({
    email: "",
    emailError: "",
    emailSent: false,
  });
  const { setLoginText } = useContext(CommonDataContext);

  const { sendForgotPasswordLink } = useContext(AccountContext);
  const { setWhichPage } = useContext(AppContext);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const onBlur = (emailVal) => {
    if (!emailVal) {
      updateEmailDetails((prevEmailDetails) => {
        const updatedEmailDetails = { ...prevEmailDetails };
        updatedEmailDetails.emailError = "Email is required";
        return updatedEmailDetails;
      });
    } else if (emailVal && !validateEmail(emailVal)) {
      updateEmailDetails((prevEmailDetails) => {
        const updatedEmailDetails = { ...prevEmailDetails };
        updatedEmailDetails.emailError = "Email is not valid";
        return updatedEmailDetails;
      });
    } else {
      updateEmailDetails((prevEmailDetails) => {
        const updatedEmailDetails = { ...prevEmailDetails };
        updatedEmailDetails.emailError = "";
        return updatedEmailDetails;
      });
    }
  };

  const handleEmailChange = (e) => {
    const emailVal = e.target.value;
    updateEmailDetails((prevEmailDetails) => {
      const updatedEmailDetails = { ...prevEmailDetails };
      updatedEmailDetails.email = emailVal;
      return updatedEmailDetails;
    });
    onBlur(emailVal);
  };
  const handleEmailMe = async (e) => {
    e.preventDefault();
    console.log("forgot password link request");
    try {
      const res = await sendForgotPasswordLink(emailDetails.email);
      updateEmailDetails((prevEmailDetails) => {
        const updatedEmailDetails = { ...prevEmailDetails };
        updatedEmailDetails.emailSent = true;
        return updatedEmailDetails;
      });
    } catch (err) {
      console.log(err);
      updateEmailDetails((prevEmailDetails) => {
        const updatedEmailDetails = { ...prevEmailDetails };
        updatedEmailDetails.databaseError = err.description;
        return updatedEmailDetails;
      });
    }
  };
  const backToSignIn = () => {
    setWhichPage("login-page");
  };

  const child = React.Children.only(props.children);
  return React.cloneElement(child, {
    ...props,
    emailDetails,
    handleEmailChange,
    handleEmailMe,
    backToSignIn,
    validateEmail,
  });
}

export default ForgotPasswordContainer;
