import { useState, useRef } from "react";
import useQuery from "./useQuery";

const useEmail = () => {
  let query = useQuery();
  let email = useRef("");
  const emailFromParams = () => {
    const parsedHash = new URLSearchParams(window.location.hash.substr(1));
    let emailFromParams;
    if (query.get("aai")) {
      emailFromParams = query.get("aai");
    } else if (parsedHash.get("aai")) {
      emailFromParams = parsedHash.get("aai");
    } else {
      emailFromParams = "";
    }
    try {
      email.current = JSON.parse(emailFromParams).ea;
    } catch {
      email.current = "";
    }
    return email.current;
  };
  const [emailFill, setEmailFill] = useState(emailFromParams());

  return [emailFill, setEmailFill];
};

export { useEmail };
