import React, { useState, useEffect } from 'react';
import {END_TIME} from '../settings';

const Stealer = (props) => {
  const [lastSteal, setLastSteal] = useState(0);
  const [cooldown, setCoolDown] = useState(0);

  let interval;
  const [timeString, setTimeString] = useState("ciao");

  useEffect(() => {
    interval = setInterval(() => {
      let time = END_TIME - Date.now();
      let [hours, minutes, seconds] = (new Date(time)).toISOString().substr(11, 8).split(':');
      setTimeString(`${hours} H ${minutes} M ${seconds} S`)
    }, 200);

    return (() => {
      clearInterval(interval);
    });
  }, []);

  return (
    <div className="container">
      {timeString}
    </div>
  )
}
export default Stealer;
