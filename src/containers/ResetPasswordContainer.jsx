import React, { useContext, useState, useMemo } from "react";
import { ResetPasswordContext } from "../providers/ResetPasswordContext";
import { CommonDataContext } from "../providers/CommonDataContext";
import { validatePassword } from "../validator/PasswordValidator";

function ResetPasswordContainer(props) {
  const { sendResetPassword } = useContext(ResetPasswordContext);
  const { passwordResetConfig } = useContext(CommonDataContext);
  const [resetPasswordSuccessful, setResetPasswordSuccessful] = useState(false)
  const [isValid, setIsValid] = useState(false);
  const [passwordRules, setPasswordRules] = useState(null);
  const [ResetPasswordForm, setResetPasswordForm] = useState({
    password: "",
    confirmPassword: "",
    isSubmitting: false,
  });
  const [PasswordPolicyState, setPasswordPolicyState] = useState({
    No_more_than_2_identical_characters_in_a_row: false,
    Special_characters: false,
    Lower_case_Upper_Case_Numbers: false,
    Length_Check: false,
    Non_empty_Password_Required: false,
    UpperCaseCheck: false,
    LowerCaseCheck: false,
    NumberCheck: false,
  });
  const [ResetPasswordError, setResetPasswordError] = useState({
    databaseError: "",
    errorCode: "",
  });
  const [loader, setLoader] = useState(false);
  const email = useMemo(() => {
    return passwordResetConfig.email

  }, [passwordResetConfig.email])

  const onClick = (e) => {
    const passwordRules = {
      passwordPolicy: "fair",
      password_complexity_options: { min_length: 8 },
    };
    setPasswordRules(passwordRules);
  };
  const onChange = (e) => {
    if (e.target.name === "password" && passwordRules) {
      validatePassword(
        passwordRules,
        e.target.value,
        PasswordPolicyState,
        setPasswordPolicyState,
        setIsValid
      );
    }
    setResetPasswordForm({
      ...ResetPasswordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async(e) => {
    e.preventDefault();
    setResetPasswordForm({
      ...ResetPasswordForm,
      isSubmitting: true,
    });
    const { tenantName, csrfToken, ticket, email } = passwordResetConfig || {};
    const data = new URLSearchParams({
      _csrf: csrfToken,
      ticket: ticket,
      newPassword: ResetPasswordForm.password,
      confirmNewPassword: ResetPasswordForm.confirmPassword,
      email: email,
    }).toString();
    const url = `https://${tenantName}.us.auth0.com/lo/reset?ticket=${ticket}`;
    const headers = { "content-type": "application/x-www-form-urlencoded" };
    try{
      const res = await sendResetPassword(url, data, headers)
      console.log(res)
      setResetPasswordError({
        ...ResetPasswordError,
        databaseError: '',
        errorCode: '',
      });
      setResetPasswordSuccessful(true)
      
    }catch(err){
      setResetPasswordError({
                ...ResetPasswordError,
                databaseError: err.description,
                errorCode: err.statusCode,
              });
    }finally{
      setResetPasswordForm({
        ...ResetPasswordForm,
        isSubmitting: false,
      });
    }
    
      
  };

  const child = React.Children.only(props.children);
  return React.cloneElement(child, {
    ResetPasswordForm,
    onChange,
    onClick,
    passwordRules,
    PasswordPolicyState,
    isValid,
    ResetPasswordError,
    loader,
    resetPasswordSuccessful,
    handleResetPassword,
    email,
  });
}

export default ResetPasswordContainer;
