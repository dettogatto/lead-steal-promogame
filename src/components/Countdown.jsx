import React, { useState, useEffect } from 'react';
import {END_TIME} from '../settings';
import { useSelector } from 'react-redux';
import { selectConfigs } from '../store/slices/config-slice';

const Countdown = (props) => {
  let interval;
  const [timeString, setTimeString] = useState("");
  const configs = useSelector(selectConfigs);

  useEffect(() => {
    interval = setInterval(() => {
      let time = configs.endTime - Date.now();
      let [hours, minutes, seconds] = (new Date(time)).toISOString().substr(11, 8).split(':');
      setTimeString(`${hours} H ${minutes} M ${seconds} S`)
    }, 200);

    return (() => {
      clearInterval(interval);
    });
  }, [configs]);

  return (
    <div className="container">
      {timeString}
    </div>
  )
}
export default Countdown;
