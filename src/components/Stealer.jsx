import React, { useState, useEffect } from 'react';
import {END_TIME} from '../settings';
import AxiosInstance from '../AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/slices/auth-slice';

const Stealer = (props) => {
  const ls_lst = localStorage.getItem('rc_lst');
  const [lastSteal, setLastSteal] = useState(ls_lst ? ls_lst : 0);
  const [cooldown, setCoolDown] = useState(0);
  const defaultCooldown = 10000;
  const auth = useSelector(selectUser);


  let interval;
  const [timeString, setTimeString] = useState("ciao");

  useEffect(() => {
    interval = setInterval(() => {
      let newCooldown = lastSteal - Date.now() + defaultCooldown;
      if(newCooldown > 0){
        setCoolDown(newCooldown);
      } else {
        setCoolDown(0);
        clearInterval(interval);
      }
    }, 120);
    return (() => {
      clearInterval(interval);
    });
  }, [lastSteal]);

  const handleSteal = () => {
    let lastSteal = Date.now();
    setLastSteal(lastSteal);
    localStorage.setItem('rc_lst', lastSteal);
    AxiosInstance.post('steal.php', {email: auth.email});
  }

  const getButtonContent = () => {
    if(cooldown > 0){
      return "COOLDOWN: " + cooldown;
    }
    return "STEAL TOP 25";
  }

  return (
    <div className="container">
      <div className="">
        <button disabled={cooldown > 0} onClick={handleSteal}>
          {getButtonContent()}
        </button>
      </div>
    </div>
  )
}
export default Stealer;
