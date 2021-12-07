import React, { useState, useContext, useRef } from "react";
import { AccountContext } from "../providers/AccountContext";
import useQuery from "../utils/useQuery";
import auth0 from "auth0-js";


function AccountUnblockContainer(props) {

  const webAuth = new auth0.WebAuth({
    domain: "live-from.us.auth0.com",
    clientID: "23PlMK9EFDLbO0bxIfKoYLr8M39qS78E",
    responseType: "token id_token",
    redirectUri: "http://localhost:4040/authorize",
  });

  const query = useQuery();
  const parsedHash = new URLSearchParams(window.location.hash.substr(1));
  const message = useRef(query.get("message") || parsedHash.get("message"));
  const success = useRef(query.get("success") || parsedHash.get("success"));
  const email = useRef(query.get("email") || parsedHash.get("email"));
  console.log(email)

  // const { sendForgotPasswordLink } = useContext(AccountContext);
  const [emailDetails, updateEmailDetails] = useState({
    email: "",
    emailError: "",
    emailSent: false,
  });

  const sendForgotPasswordLink = (email) => {
    return new Promise((resolve, reject) => {
      webAuth.changePassword(
        {
          // connection: "AV-Password-Authentication",
          connection: "Username-Password-Authentication",
          // connection: "Test-CustomDB",
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

  const handleEmailMe = async (e) => {
    e.preventDefault();
    console.log("forgot password link request");
    try {
      await sendForgotPasswordLink(email.current);
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
 

  const child = React.Children.only(props.children);
  return React.cloneElement(child, {
    message,
    success,
    handleEmailMe
  });
}

export default AccountUnblockContainer;
