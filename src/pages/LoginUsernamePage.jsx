import './Login.scss'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authChooseUsername } from '../store/actions/auth-actions';
import { selectError } from '../store/slices/auth-slice';
import {selectUser} from '../store/slices/auth-slice';
import { useNavigate } from 'react-router-dom';
import pirate from '../assets/pirate-raccoon.png'


const LoginUsernamePage = (props) => {

  const auth = useSelector(selectUser);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    // Redirect to sign up if no email found
    if(!auth.email){
      navigate('/login');
    }
  }, [auth]);


  const handleLogin = (e) => {
    e.preventDefault();


    dispatch(authChooseUsername({
      username: username,
      email: auth.email
    }));

  }

  return (
    <>
    <div className="spacer"></div>
    <div className="container middle center centered form-container">
      <div style={{backgroundImage: `url(${pirate})`}} className="pirate centered"></div>
      <form>
        <h1>Ruba il tuo NFT</h1>
        {error && (
          <div className="error container">
            {error}
          </div>
        )}
        <input
          type="text"
          placeholder="Inserisci il tuo nickname"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        <button onClick={handleLogin}>Inizia!</button>
      </form>
    </div>
    <div className="footer-treasure"></div>
    </>
  )
}
export default LoginUsernamePage;
