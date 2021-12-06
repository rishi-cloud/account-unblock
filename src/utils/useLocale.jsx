import { useState, useRef } from "react";
import useQuery from "./useQuery";

const useLocale = () => {
  let query = useQuery();
  let locale = useRef("");
  const parsedHash = new URLSearchParams(window.location.hash.substr(1));
  let lang;
  let culture = query.get("culture") ?? parsedHash.get("culture");
  if (culture === null) {
    if (localStorage.getItem("lang") === null) {
      lang = "en-us";
    } else {
      lang = localStorage.getItem("lang");
    }
  } else {
    lang = culture;
    localStorage.setItem("lang", lang);
  }
  if (lang) {
    locale.current = lang;
  } else {
    locale.current = "en-us";
  }
  const [appLocale, setAppLocale] = useState(locale.current);
  return [appLocale, setAppLocale];
};
export { useLocale };
