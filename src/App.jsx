import './App.scss';
import React, {useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginEmailPage from './pages/LoginEmailPage';
import LoginUsernamePage from './pages/LoginUsernamePage';
import LeaderboardPage from './pages/LeaderboardPage';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './store/slices/auth-slice';
import { authLogin } from './store/actions/auth-actions';



function App() {

  const auth = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(auth.username && auth.email){
      navigate('/leaderboard');
    } else if(auth.email){
      navigate('/username');
    }
  }, [auth]);

  useEffect(() => {
    let email = localStorage.getItem('rc_user_email');
    if(email){
      dispatch(authLogin({
        email: email
      }));
    }
  }, []);


  return (
    <>
    <Routes>
      <Route index element={<LoginEmailPage />} />
      <Route exact path="/login" element={<LoginEmailPage />} />
      <Route exact path="/username" element={<LoginUsernamePage />} />
      <Route exact path="/leaderboard" element={<LeaderboardPage username={auth.username} />} />
      <Route path="*" element={<span>There&apos;s no raccoon here: 404!</span>} />
    </Routes>
    </>
);
}

export default App;
