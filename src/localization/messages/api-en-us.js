import { LOCALES } from "../constants";
const en = {
  [LOCALES.DEMO]: {
    "login.invalid_user_password":
      "We couldn’t sign you with this email and password. Try again, <a_reset_pass>reset your password</a_reset_pass>, or <a_signin_otp>sign in with a one-time passcode.</a_signin_otp>",
    "login.ACT0104":
      "For your security, password sign in for <b>{email}</b> has been locked due to too many sign in attempts.",
    "login.ACT0105":
      "For your security, password sign in for <b>{email}</b> has been locked due to too many sign in attempts.",
    "login.invalid_passcode":
      "We couldn’t sign you with this passcode. Try again or <a_rotp>resend code</a_rotp>.",
    "login.access_denied":
      "We couldn’t sign you with this email and password. Try again, <a_reset_pass>reset your password</a_reset_pass>, or <a_signin_otp>sign in with a one-time passcode.</a_signin_otp>",

    "login.password_lock":
      "For your security, password sign in for <b>{email}</b> has been locked due to too many sign in attempts.",
    "login.auth0_password_lock":
      "We just sent an email with a link to unlock your account. You may sign in with a one-time passcode, <a_reset_pass>try resetting your password</a_reset_pass> or <a_contact_support>Contact Support.</a_contact_support>",
    "passwordless.bad.email":
      "Sorry, we couldn’t find an account for this email address.",
    "passwordless.invalid_user_password":
      "We couldn’t sign you with this passcode. <a_rotp>Try again or resend code.</a_rotp>",
    "passwordless.access_denied":
      "We couldn’t sign you with this passcode. <a_rotp>Try again or resend code.</a_rotp>",
    "passwordless.passcode_lock":
      "For your security, passcode sign in for <b>{email}</b> has been locked due to too many sign in attempts.",

    "forgotPassword.too_many_requests":
      "You've reached the maximum number of password change attempts. Wait a few minutes and try again.",
    "signUp.export_restriction":
      "We can’t create an account for <b>{email}</b> because your email is from a country subject to US export restrictions, or your company is on a list of prohibited organizations, either by the US or foreign government agency.",
    Welcome_back_to: "Welcome back to Mcafee!",
    fallback_error: "We're sorry, something went wrong",
    email: "Email",
    password: "Password",
    signIn: "Sign in",
    choose_your_signIn_method_continue:
      "Choose your sign in method to continue",
    or: "OR",
    signIn_with_password: "Sign in with a password",
    one_time_passcode: "One-time passcode",
    Sign_in_with_a_onetime_passcode: "Sign in with a one-time passcode",
    continue: "Continue",
    Do_not_have_an_account: "Don't have an Account?",
    Enter_your_email_address_set_password_and_well_get_your_account_created:
      "Enter your email address, set a password and we’ll create your account.",
    Already_have_an_account: "Already have an account?",
    confirm_password: "Confirm password",
    ResendCode: "Resend code",
    Create_my_Account: "Create my account",
    Sign_into_your_McAfee_account: "Sign into your McAfee account",
    Signing_you_in: "Signing you in...",
    Create_one_now: "Create one now",
    Create_your_McAfee_account: "Create your McAfee account",
    Looks_like_you_already_have_an_account:
      "Looks like you already have an account! Sign in now",
    This_email_already_exists:
      "This email address is already associated with a McAfee account. Sign in to Continue",
    contactUs: "Contact Us",
    privacyNotice: "Privacy Notice",
    FAQs: "FAQs",
    Copyright_Text: "Copyright ©2021 McAfee , LLC",
    If_you_didnt_receive_a_passcode_check_your_spam_folder:
      "If you didn't receive a passcode, check your spam folder.",
    we_will_send_otp:
      "We’ll send a one-time passcode to your email address to verify your identity and sign you in.",
    Sign_in_now: "Sign in now",
    This_passcode_has_expired: "This passcode has expired.",
    Passcode_expires_in: "Passcode expires in",
    We_will_send_you_a_otp_title: "We’ll send you a one-time passcode",
    We_will_send_you_a_otp_subtitle: "Enter your email address to continue.",
    Send_new_code: "Send new code",
    By_clicking_Create_my_Account_you_accept_McAfee_License_Agreement_and_Privacy_Notice:
      "By clicking <b>Create my Account</b> you accept <a_McAfee_License>McAfee’s License Agreement</a_McAfee_License> and <a_privacy_notice>Privacy Notice</a_privacy_notice>",
    We_are_sorry_but_we_could_not_create_your_account:
      "We’re sorry, but we couldn’t create your account",
    Email_us_at:
      "Email us at <b>export@mcafee.com</b> if you have any questions.",
    Sign_in_with_a_different_email_address:
      "Sign in with a different email address",
    You_have_reached_the_maximum_number_of_password_attempts:
      "You’ve reached the maximum number of password attempts",
    You_have_reached_the_maximum_number_of_passcode_attempts:
      "You’ve reached the maximum number of passcode attempts",
    You_can_sign_in_with_a_otp_or_to_unlock_your_account_you_may_reset_your_password_or_Contact_Support:
      "You can sign in with a one-time passcode, or to unlock your account, you may <a_reset_pass>reset your password</a_reset_pass> or <a_contact_support>Contact Support.</a_contact_support>",
    We_sent_a_otp_to_email: "We sent a one-time passcode to <b>{email}</b>",
    UpperCaseCheck: "1 uppercase letter (A-Z)",
    LowerCaseCheck: "1 lowercase letter (a-z)",
    NumberCheck: "1 number (0-9)",
    Length_Check: "{leastcount} to 32 characters",
    Creating_your_account: "Creating your account...",
    Forgot_password: "Forgot password?",
    Reset_Password: "Reset password",
    Enter_email_to_reset_password:
      "Enter the email you used to create your McAfee account and we’ll send you a link to reset your password.",
    Forgot_your_password_contact_support:
      "Forgot which email you used? <a_contact_support>Contact Support</a_contact_support>",
    Email_me: "Email me",
    Go_back_to_signin: "Go back to sign in",
    Back_to_signin: "Back to sign in",
    Check_inbox: "Check your inbox",
    Password_reset_link_sent:
      "Password reset link sent. Use it within 72 hours to reset your password.",
    Did_not_receive_reset_password_link_request_another_email_forgot_email_need_help_contact_support:
      "If you didn't receive a link, check your spam folder or <a_request_another_mail>request another email</a_request_another_mail>. Forgot which email you used or need help? <a_contact_support>Contact Support</a_contact_support>",
    Enter_new_password: "Enter your new password for {email}.",
    Password_successfully_reset: "Password successfully reset!",
    Close_tab_to_previous_page_to_signin:
      "Close this tab to return to the previous page and sign in.",
    Need_help: "Need help?",
    Contact_support: "Contact support",
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
  },
};
export default en;
