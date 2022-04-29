import './LoginPage.scss'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authLogin } from '../store/actions/auth-actions';
import { selectError } from '../store/slices/auth-slice';

const LoginPage = (props) => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const error = useSelector(selectError);

  const dispatch = useDispatch();


  const handleLogin = (e) => {
    e.preventDefault();


    dispatch(authLogin({
      email: email,
      username: username
    }));

  }

  return (
    <div className="container fullscreen absolute">
      <div className="row middle center form-container">
        <form>
          {error && (
            <div className="error container">
              {error}
            </div>
          )}
          Your email:
          <input
            type="email"
            placeholder="magic.raccoon@give.me"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          Your username:
          <input
            type="text"
            placeholder="RaccoonStealer42"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
          <button onClick={handleLogin}>Start Stealing!</button>
        </form>
      </div>
    </div>
  )
}
export default LoginPage;
