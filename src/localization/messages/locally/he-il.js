const he = {
  ["he-il"]: {
    "login.invalid_user_password":
      'לא הצלחנו להכניס אותך עם כתובת הדוא"ל והסיסמה האלה. יש לנסות שוב <a_reset_pass>לאפס את הסיסמה</a_reset_pass>, או <a_signin_otp>להיכנס עם קוד כניסה חד-פעמי.</a_signin_otp>',
    "login.ACT0104":
      "למען בטחונך, כניסה באמצעות סיסמה עבור <b>{email}</b> נחסמה בגלל מספר גדול מדי של ניסיונות.",
    "login.ACT0105":
      "למען בטחונך, כניסה באמצעות סיסמה עבור <b>{email}</b> נחסמה בגלל מספר גדול מדי של ניסיונות.",
    "login.invalid_passcode":
      "לא הצלחנו להכניס אותך עם קוד הכניסה הזה. יש לנסות שוב, או <a_rotp>לשלוח קוד חדש</a_rotp>.",
    "login.password_lock":
      "למען בטחונך, כניסה באמצעות סיסמה עבור <b>{email}</b> נחסמה בגלל מספר גדול מדי של ניסיונות.",
    "login.auth0_password_lock":
      'שלחנו אליך הרגע הודעת דוא"ל עם קישור לפתיחת החשבון שלך. ניתן להיכנס עם קוד סיסמה חד-פעמי, <a_reset_pass>לנסות לאפס את הסיסמה</a_reset_pass> או <a_contact_support>ליצור קשר עם התמיכה.</a_contact_support>',
    "passwordless.bad.email": 'מצטערים, לא מצאנו חשבון עבור כתובת הדוא"ל הזו.',
    "forgotPassword.too_many_requests":
      "הגעת למספר המקסימלי של ניסיונות לעדכון סיסמה. יש להמתין כמה דקות ולנסות שוב.",
    "signUp.export_restriction":
      'אין באפשרותנו ליצור חשבון עבור <b>{email}</b> משום שכתובת הדוא"ל שלך היא במדינה הכפופה למגבלות ייצוא של ארה"ב, או שהחברה שלך נמצאת ברשימת ארגונים אסורים של ארה"ב או של גוף ממשלתי זר.',
    Welcome_back_to: "ברוכים השבים אל McAfee!",
    fallback_error: "מצטערים, משהו השתבש",
    email: 'כתובת דוא"ל',
    password: "סיסמה",
    signIn: "כניסה למערכת",
    choose_your_signIn_method_continue: "כדי להמשיך, יש לבחור שיטת כניסה",
    or: "או",
    signIn_with_password: "כניסה באמצעות סיסמה",
    one_time_passcode: "קוד כניסה חד-פעמי",
    Sign_in_with_a_onetime_passcode: "כניסה באמצעות קוד  חד-פעמי",
    continue: "המשך",
    Do_not_have_an_account: "אין לך חשבון?",
    Enter_your_email_address_set_password_and_well_get_your_account_created:
      'יש להזין כתובת דוא"ל ולהגדיר סיסמה, ואנו ניצור את החשבון שלך.',
    Already_have_an_account: "כבר יש לך חשבון?",
    confirm_password: "אישור סיסמה",
    ResendCode: "שליחת קוד חדש",
    Create_my_Account: "יצירת החשבון שלי",
    Sign_into_your_McAfee_account: "עליך להיכנס לחשבון McAfee שלך",
    Signing_you_in: "מכניס אותך למערכת...",
    Create_one_now: "יצירת חשבון עכשיו",
    Create_your_McAfee_account: "יצירת חשבון McAfee שלך",
    Looks_like_you_already_have_an_account:
      "נראה שכבר יש לך חשבון! כניסה למערכת עכשיו",
    This_email_already_exists:
      'כתובת הדוא"ל כבר משוייכת לחשבון McAfee. כדי להמשיך, יש להיכנס למערכת',
    contactUs: "יצירת קשר איתנו",
    privacyNotice: "הודעת הפרטיות",
    FAQs: "תשובות לשאלות נפוצות",
    Copyright_Text: "זכויות יוצרים ©2021 McAfee , LLC",
    If_you_didnt_receive_a_passcode_check_your_spam_folder:
      "אם לא קיבלת את קוד הכניסה, יש לבדוק בתיקיית דואר הזבל שלך.",
    we_will_send_otp:
      'נשלח קוד כניסה חד-פעמי אל כתובת הדוא"ל שלך כדי לאמת את זהותך ולהכניס אותך למערכת.',
    Sign_in_now: "כניסה למערכת עכשיו",
    This_passcode_has_expired: "התוקף של קוד הכניסה הזה פג.",
    Passcode_expires_in: "קוד הכניסה יפקע בעוד",
    We_will_send_you_a_otp_title: "נשלח אליך קוד כניסה חד-פעמי",
    We_will_send_you_a_otp_subtitle:
      'כדי להמשיך, יש להזין את כתובת הדוא"ל שלך.',
    Send_new_code: "שליחת קוד חדש",
    By_clicking_Create_my_Account_you_accept_McAfee_License_Agreement_and_Privacy_Notice:
      "באמצעות לחיצה על <b>יצירת החשבון שלי</b>, הסכמת לתנאי <a_McAfee_License>הסכם הרישיון של McAfee</a_McAfee_License> וכן לתנאי <a_privacy_notice>הודעת הפרטיות</a_privacy_notice>",
    We_are_sorry_but_we_could_not_create_your_account:
      "מצטערים, לא הצלחנו ליצור את החשבון שלך",
    Email_us_at: 'יש לשלוח דוא"ל אל <b>export@mcafee.com</b> אם יש לך שאלות.',
    Sign_in_with_a_different_email_address: 'כניסה עם כתובת דוא"ל אחרת',
    You_have_reached_the_maximum_number_of_password_attempts:
      "הגעת למספר המקסימלי של ניסיונות להזין סיסמה",
    You_can_sign_in_with_a_otp_or_to_unlock_your_account_you_may_reset_your_password_or_Contact_Support:
      "ניתן להיכנס עם קוד כניסה חד-פעמי, או לנסות לפתוח את נעילת החשבון באמצעות <a_reset_pass>איפוס הסיסמה שלך</a_reset_pass> או <a_contact_support>יצירת קשר עם התמיכה.</a_contact_support>",
    We_sent_a_otp_to_email: "שלחנו קוד כניסה חד פעמי אל <b>{email}</b>",
    UpperCaseCheck: "אות רישית אחת (A-Z)",
    LowerCaseCheck: "אות קטנה אחת (a-z)",
    NumberCheck: "ספרה אחת (9-0)",
    Length_Check: "{leastcount} עד 32 תווים",
    Creating_your_account: "אנו יוצרים את החשבון שלך...",
    Forgot_password: "שכחת סיסמה?",
    Reset_Password: "איפוס סיסמה",
    Enter_email_to_reset_password:
      'יש להזין את כתובת הדוא"ל שבה השתמשת כדי ליצור את חשבון ה-McAfee שלך ואנו נשלח לך קישור לאיפוס הסיסמה.',
    Forgot_your_password: 'שכחת באיזו כתובת דוא"ל השתמשת? ',
    Contact_support: "Contact support",
    Go_back_to_signin: "בחזרה למסך הכניסה למערכת",
    Email_me: 'שלחו לי דוא"ל',
    Check_inbox: "עליך לבדוק בתיבת הדואר הנכנס שלך",
    Password_reset_link_sent:
      "הקישור לאיפוס הסיסמה נשלח. יש להשתמש בו תוך 72 שעות כדי לאפס את הסיסמה שלך.",
    Back_to_signin: "בחזרה למסך הכניסה למערכת",
    "Didn't_receive_reset_password_link":
      'אם לא קיבלת קישור, יש לבדוק בתיבת דואר הזבל או <a_request_another_mail>לבקש הודעת דוא"ל נוספת</a_request_another_mail>. שכחת באיזו כתובת דוא"ל השתמשת או שיש לך צורך בעזרה? <a_contact_support>יצירת קשר עם התמיכה</a_contact_support>',
    Enter_new_password: "יש להזין סיסמה חדשה עבור {email}.",
    "Password_successfully_reset!": "הסיסמה אופסה בהצלחה!",
    Close_tab_to_previous_page_to_signin:
      "יש לבחור כרטיסייה זו כדי לחזור לדף הקודם ולהיכנס למערכת. ",
    "passwordless.invalid_user_password":
      "We couldn’t sign you with this passcode. <a_rotp>Try again or resend code.</a_rotp>",
    "passwordless.passcode_lock":
      "For your security, passcode sign in for <b>{email}</b> has been locked due to too many sign in attempts.",
    Need_help: "Need help?",
    login_lock_title:
      "We’ve temporarily locked your account to protect your identity",
    login_lock_subtitle:
      "We sent an email to <b>{email}</b> to unlock your account. Or you can <a_reset_pass>reset your password</a_reset_pass> or <a_contact_support>Contact Support</a_contact_support> to verify your identity and unlock your account.",
    otp_lock_bottom_Message:
      "You may sign in with a password, try <a_reset_pass>resetting your password</a_reset_pass> or <a_contact_support>Contact Support.</a_contact_support>",
    optin_VirusThreats:
      "I want to receive information about the latest viruses(available in English only).",
    optin_SpecialPromo:
      " I would like to receive information about McAfee special offers.",
    optin_PartnerPromo:
      "I would like to receive information about special offers from McAfee partners.",
    Resending_code: "Resending code...",
    Code_sent: "Code sent.",
    "passwordless.multiple_resend_otp":
      "You’ve reached the maximum number of one-time passcode attempts. Wait a few minutes and try again.",
    You_have_reached_the_maximum_number_of_passcode_attempts:
      "You’ve reached the maximum number of passcode attempts",
    We_just_sent_an_email_with_a_link_to_unlock_your_account_You_may_sign_in_with_a_password:
      "We just sent an email with a link to unlock your account. You may sign in with a password, <a_reset_pass>try resetting your password</a_reset_pass> or <a_contact_support>Contact Support.</a_contact_support>",
  },
};
export default he;
