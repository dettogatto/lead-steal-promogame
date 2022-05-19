import React, { useState, useEffect } from 'react';
import {END_TIME} from '../settings';
import AxiosInstance from '../AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/slices/auth-slice';
import { useNavigate } from 'react-router-dom';

const Stealer = (props) => {
  const ls_lst = localStorage.getItem('rc_lst');
  const [lastSteal, setLastSteal] = useState(ls_lst ? ls_lst : 0);
  const [cooldown, setCoolDown] = useState(0);
  const defaultCooldown = 10000;
  const auth = useSelector(selectUser);
  const navigate = useNavigate();


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
    if(!auth.email){
      navigate('/login');
      return false;
    }
    setCoolDown(defaultCooldown);
    AxiosInstance.post('steal.php', {email: auth.email}).then(() => {
      let lastSteal = Date.now();
      setLastSteal(lastSteal);
      localStorage.setItem('rc_lst', lastSteal);
      props.refreshBoard();
    });
  }

  const getButtonContent = () => {
    if(props.gameEnded){
      return "THE SHIP HAS SAILED";
    }
    if(cooldown === defaultCooldown){
      return "STEALING...";
    }
    if(cooldown > 0){
      return "COOLDOWN: " + cooldown;
    }
    return "STEAL TOP 25";
  }

  const getButtonDisabled = () => {
    return (cooldown > 0 || props.gameEnded || lastSteal === -1);
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
