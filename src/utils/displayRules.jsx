import Rules from "./Rules";
export const DisplayRules = (passwordRules, PasswordPolicyState) => {
  const displayablerule = [];
  const getKeys = [];
  const ruleMap =
    passwordRules &&
    Rules({
      count: passwordRules?.password_complexity_options?.min_length,
    });
  if (passwordRules?.passwordPolicy === "excellent") {
    for (const key of Object.keys(PasswordPolicyState)) {
      if (key !== "Non_empty_Password_Required") {
        getKeys.push(key);
        displayablerule.push(ruleMap[key]);
      }
    }
  } else if (passwordRules?.passwordPolicy === "good") {
    for (const key of Object.keys(PasswordPolicyState)) {
      if (
        key === "LowerCaseCheck" ||
        key === "UpperCaseCheck" ||
        key === "NumberCheck" ||
        key === "Length_Check" ||
        key === "Special_characters"
      ) {
        getKeys.push(key);
        displayablerule.push(ruleMap[key]);
      }
    }
  } else if (passwordRules?.passwordPolicy === "fair") {
    for (const key of Object.keys(PasswordPolicyState)) {
      if (
        key === "LowerCaseCheck" ||
        key === "UpperCaseCheck" ||
        key === "NumberCheck" ||
        key === "Length_Check"
      ) {
        getKeys.push(key);
        displayablerule.push(ruleMap[key]);
      }
    }
  } else if (passwordRules?.passwordPolicy === "low") {
    for (const key of Object.keys(PasswordPolicyState)) {
      if (key === "Length_Check") {
        getKeys.push(key);
        displayablerule.push(ruleMap[key]);
      }
    }
  } else if (passwordRules?.passwordPolicy === null) {
    for (const key of Object.keys(PasswordPolicyState)) {
      if (key === "Non_empty_Password_Required") {
        getKeys.push(key);
        displayablerule.push(ruleMap[key]);
      }
    }
  }
  return { getKeys, displayablerule };
};
