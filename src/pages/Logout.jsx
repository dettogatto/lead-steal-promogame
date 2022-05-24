import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/slices/auth-slice';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {

  const navigate = useNavigate();

  useEffect(() => {
    if(auth.email){
      localStorage.removeItem('rc_user_email');
    }
    navigate('/login');
  }, [auth])

  return (
    <div>
    </div>
  )
}
export default Logout;
