import React, { useState, useEffect } from 'react';
import {END_TIME} from '../settings';
import { useSelector } from 'react-redux';
import { selectConfigs } from '../store/slices/config-slice';

const Countdown = (props) => {
  let interval;
  const [timeString, setTimeString] = useState("00 H 00 M 00 S");
  const configs = useSelector(selectConfigs);

  useEffect(() => {
    console.log('effect');
    if(!props.gameEnded){
      interval = setInterval(() => {
        let time = configs.endTime - Date.now();
        if(time < 0){
          props.setGameEnded(true);
        }
        let [hours, minutes, seconds] = (new Date(time)).toISOString().substr(11, 8).split(':');
        let days = Math.floor(time / (1000*60*60*24));
        if(days < 10){days = "0" + days;}
        let result = days > 0 ? `${days} D ${hours} H ${minutes} M ${seconds} S` : `${hours} H ${minutes} M ${seconds} S`;
        setTimeString(result);
      }, 500);
    } else {
      setTimeString("00 H 00 M 00 S");
    }

    return (() => {
      clearInterval(interval);
    });
  }, [configs, props.gameEnded]);


  return (
    <div className="container">
      {timeString}
    </div>
  )
}
export default Countdown;
