import React, { useEffect, useState } from 'react';
import { useChannel } from "./AblyReactEffect";

const AblyChatComponent = () => {
  // * On page load, calculate time to Tuesday Noon
  // * Count down LOCALLY second by second
  // * Messages received are "+1 hour" or "+1 day" etc
  // * +/- 1 hour, day, month

  // Display:
  // X Days 13:37:42

  // Function to calculate time to Tuesday Noon
  const calculateTimeToDueDate = (dueDate) => {
    const now = new Date();

    const ms = dueDate - now;

    // Render time to Tuesday Noon as a string
    const days = Math.floor(ms / (24*60*60*1000));
    const daysms = ms % (24*60*60*1000);
    const hours = Math.floor(daysms / (60*60*1000));
    const hoursms = ms % (60*60*1000);
    const minutes = Math.floor(hoursms / (60*1000));
    const minutesms = ms % (60*1000);
    const sec = Math.floor(minutesms / 1000);
    return days + " days " + hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0");
  }

  const [dueDate, setDueDate] = useState(new Date(2023, 1, 28, 12, 0, 0, 0));
  const [calibrationTime, setCalibrationTime] = useState(0);
  const [timerString, setTimerString] = useState(calculateTimeToDueDate(dueDate));
  const [channel, ably] = useChannel("chat-demo", (message) => {
    console.log("received message")
    const dueDateAsMs = dueDate.getTime();
    const adjustedDueDateAsMs = dueDateAsMs + parseInt(message.data);
    setDueDate(new Date(adjustedDueDateAsMs));
    setCalibrationTime(2000);
  });

  // Run function every 1 second to update timer
  useEffect(() => {
    const interval = setInterval(() => {
      let calibTime = calibrationTime
      if (calibTime > 0) {
        setTimerString("CALIBRATING...");
        setCalibrationTime(calibTime - 1000);
        console.log("calibrationTime", calibTime)
      } else {
        setTimerString(calculateTimeToDueDate(dueDate));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [dueDate, calibrationTime]);

  return (
    <div className='display'>
      <div className={timerString == "CALIBRATING..." ? "calibrator" : "timer"}>
        {timerString}
      </div>
    </div>
  )
}

export default AblyChatComponent;