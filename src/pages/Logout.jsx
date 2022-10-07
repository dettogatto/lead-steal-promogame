import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/slices/auth-slice';
import { useNavigate } from 'react-router-dom';
import { LOCALSTORAGE_EMAIL_FIELD } from '../settings';

const Logout = (props) => {

  const navigate = useNavigate();

  useEffect(() => {
    if(auth.email){
      localStorage.removeItem(LOCALSTORAGE_EMAIL_FIELD);
    }
    navigate('/login');
  }, [auth])

  return (
    <div>
    </div>
  )
}
export default Logout;
