import React from "react";
import { useEffect } from "react";
import "./style.css";
import translate from "../../localization/translate";

const Timer = (props) => {
  const { TimerState, setTimer, setOtpValid, getOtp } = props;

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (TimerState.seconds > 0) {
        setTimer({ ...TimerState, seconds: TimerState.seconds - 1 });
      }
      if (TimerState.seconds === 0) {
        if (TimerState.minutes === 0) {
          setOtpValid(false);
          clearInterval(myInterval);
        } else {
          setTimer({
            minutes: TimerState.minutes - 1,
            seconds: 59,
          });
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="timer-class">
      {TimerState.minutes === 0 && TimerState.seconds === 0 ? (
        <div className="timer-inactive">
          {translate("This_passcode_has_expired")}
          <div className="resend-passcode" onClick={getOtp}>
            {translate("Send_new_code")}
          </div>
        </div>
      ) : (
        <div className="timer-active">
          {translate("Passcode_expires_in")}{" "}
          <span style={{ fontWeight: 700 }}>
            {TimerState.minutes === 0 && TimerState.seconds > 0
              ? TimerState.seconds
              : TimerState.minutes === 3
              ? TimerState.minutes
              : TimerState.minutes + 1}
          </span>{" "}
          {TimerState.minutes === 0 && TimerState.seconds > 0
            ? "seconds"
            : "minutes"}
        </div>
      )}
    </div>
  );
};

export default Timer;
