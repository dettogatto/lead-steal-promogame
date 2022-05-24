import React, { useState, useEffect } from 'react';
import {END_TIME} from '../settings';
import { useDispatch, useSelector } from 'react-redux';
import { selectConfigs, checkGameEnded } from '../store/slices/config-slice';


const Countdown = (props) => {
  let interval;
  const [timeArray, setTimeArray] = useState(['00', '00', '00']);
  const [title, setTitle] = useState("The game will end soon!");
  const configs = useSelector(selectConfigs);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!configs.gameEnded){
      interval = setInterval(() => {
        let time = configs.endTime - Date.now();
        if(time < 0){
          dispatch(checkGameEnded());
        }
        let result = (new Date(time)).toISOString().substr(11, 8).split(':');
        let days = Math.floor(time / (1000*60*60*24));
        if(days < 1){
          setTimeArray(result);
          return;
        }
        if(days < 10){days = "0" + days;}
        setTimeArray([days, ...result]);
      }, 500);
    } else {
      setTitle('The game has ended!');
      setTimeArray(['00', '00', '00']);
    }

    return (() => {
      clearInterval(interval);
    });
  }, [configs]);

  const getCountdown = () => {
    return timeArray.map((num, index) => {
      return (<div key={index} className="value">{num}</div>);
    });
  }

  const getTitle = () => {
    if(!configs.gameEnded){
      return (<span>The game will <br /> end soon!</span>);
    }
    return (<span>The game <br /> has ended!</span>);
    return "The game has ended!";
  }


  return (
    <div className="row middle center countdown-container">
      { getCountdown() }
      <div>
        <h1>
          {getTitle()}
        </h1>
      </div>
    </div>
  )
}
export default Countdown;
