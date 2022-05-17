import './Login.scss'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authChooseUsername } from '../store/actions/auth-actions';
import { selectError } from '../store/slices/auth-slice';
import {selectUser} from '../store/slices/auth-slice';
import { useNavigate } from 'react-router-dom';


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
    <div className="container fullscreen absolute">
      <div className="row middle center form-container">
        <form>
          {error && (
            <div className="error container">
              {error}
            </div>
          )}
          Your username:
          <input
            type="email"
            placeholder="MajesticRaccoon"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
          <button onClick={handleLogin}>Start Stealing!</button>
        </form>
      </div>
    </div>
  )
}
export default LoginUsernamePage;
