function Rules({ count }) {
  const Rules = {
    No_more_than_2_identical_characters_in_a_row:
      "No more than 2 identical characters in a row",
    Special_characters: "Special characters (!@#$%^&*)",
    UpperCaseCheck: "UpperCaseCheck",
    LowerCaseCheck: "LowerCaseCheck",
    NumberCheck: "NumberCheck",
    Lower_case_Upper_Case_Numbers:
      "Lower case (a-z), upper case (A-Z) and numbers (0-9)",
    Length_Check: `Length_Check`,
    Non_empty_Password_Required: "Non-empty Password Required",
  };
  return Rules;
}

export default Rules;
