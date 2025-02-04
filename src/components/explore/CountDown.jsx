import React, { useState, useEffect } from "react";

const CountDown = ({ expiryDate }) => {
  const [timeText, setTimeText] = useState("");

  useEffect(() => {
    if (!expiryDate || new Date(expiryDate) < new Date()) {
      setTimeText("EXPIRED");
      return;
    }

    const calculateTime = () => {
      const millisLeft = new Date(expiryDate) - Date.now();

      if (millisLeft < 0) {
        setTimeText("EXPIRED");
        return;
      }

      const secondsLeft = millisLeft / 1000;
      const minutesLeft = secondsLeft / 60;
      const hoursLeft = minutesLeft / 60;

      const displayHours = Math.floor(hoursLeft % 24);
      const displayMinutes = Math.floor(minutesLeft % 60);
      const displaySeconds = Math.floor(secondsLeft % 60);

      setTimeText(
        `${displayHours}h ${displayMinutes}m ${displaySeconds}s`
      );
    };

    calculateTime(); // Initial call to set the time immediately

    const intervalId = setInterval(() => {
      calculateTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryDate]);

  if (timeText === "EXPIRED") {
    return null;
  }

  return <div>{timeText}</div>;
};

export default CountDown;