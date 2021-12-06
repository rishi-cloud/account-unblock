import React from "react";
import { useState } from "react";
import "./style.css";
import translate from "../../localization/translate";
import useInterval from "../../utils/useInterval";

const Timer = (props) => {
  const { setOtpValid, getOtp } = props;

  const [TimerState, setTimer] = useState({
    minutes: 20,
    seconds: 0,
  });
  const [stop, setStop] = useState(1000);

  useInterval(() => {
    if (TimerState.seconds > 0) {
      setTimer({ ...TimerState, seconds: TimerState.seconds - 1 });
    }
    if (TimerState.seconds === 0) {
      if (TimerState.minutes === 0) {
        setOtpValid(false);
        setStop(null);
      } else {
        setTimer({
          minutes: TimerState.minutes - 1,
          seconds: 59,
        });
      }
    }
  }, stop);

  return (
    <div className="timer-class">
      {TimerState.minutes === 0 && TimerState.seconds === 0 ? (
        <div className="timer-inactive">
          {translate("This_passcode_has_expired")}
          <div
            className="resend-passcode"
            onClick={getOtp}
            data-nav-element-click="resend-otp"
          >
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
