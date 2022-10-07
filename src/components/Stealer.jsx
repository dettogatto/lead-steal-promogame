import React, { useState, useEffect } from 'react';
import {END_TIME} from '../settings';
import AxiosInstance from '../AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/slices/auth-slice';
import { selectConfigs } from '../store/slices/config-slice';
import { useNavigate } from 'react-router-dom';

const Stealer = (props) => {
  const ls_lst = localStorage.getItem('rc_lst');
  const [lastSteal, setLastSteal] = useState(ls_lst ? ls_lst : 0);
  const [cooldown, setCoolDown] = useState(0);
  const auth = useSelector(selectUser);
  const configs = useSelector(selectConfigs);
  const navigate = useNavigate();

  let interval;
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    interval = setInterval(() => {
      let newCooldown = lastSteal - Date.now() + configs.cooldown;
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
    if(!auth.email){
      navigate('/login');
      return false;
    }
    setCoolDown(configs.cooldown);
    AxiosInstance.post('steal.php', {email: auth.email}).then(() => {
      let lastSteal = Date.now();
      setLastSteal(lastSteal);
      localStorage.setItem('rc_lst', lastSteal);
      props.refreshBoard();
    });
  }

  const getButtonContent = () => {
    if(configs.gameEnded){
      return "LA NAVE È SALPATA";
    }
    if(cooldown === configs.cooldown){
      return "ARREMBAGGIO...";
    }
    if(cooldown > 0){
      return "COOLDOWN: " + (cooldown/1000).toFixed(2);
    }
    return "CONQUISTA UN POSTO!";
  }

  const getButtonDisabled = () => {
    return (cooldown > 0 || configs.gameEnded || lastSteal === -1);
  }

  return (
    <div className="stealer-container container">
      <button disabled={getButtonDisabled()} onClick={handleSteal}>
        {getButtonContent()}
      </button>
    </div>
  )
}
export default Stealer;
