import './Login.scss'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authLogin } from '../store/actions/auth-actions';
import { selectError } from '../store/slices/auth-slice';
import pirate from "../assets/pirate-raccoon.png";

const LoginEmailPage = (props) => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const error = useSelector(selectError);

  const dispatch = useDispatch();


  const handleLogin = (e) => {
    e.preventDefault();


    dispatch(authLogin({
      email: email
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
          type="email"
          placeholder="Inserisci la tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        <button onClick={handleLogin}>Entra!</button>
      </form>
    </div>
    <div className="footer-treasure"></div>
    </>
  )
}
export default LoginEmailPage;
