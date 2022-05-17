import './Login.scss'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authLogin } from '../store/actions/auth-actions';
import { selectError } from '../store/slices/auth-slice';

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
          <button onClick={handleLogin}>Login!</button>
        </form>
      </div>
    </div>
  )
}
export default LoginEmailPage;
