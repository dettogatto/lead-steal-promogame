import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, authLogout } from '../store/slices/auth-slice';
import { useNavigate } from 'react-router-dom';

const Footer = (props) => {

  const navigate = useNavigate();
  const auth = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(authLogout());
    navigate('/login');
  }

  const getLogout = () => {
    if(!auth.email){
      return (
        <p>
          <a href="#" onClick={() => navigate('/login')}>Login</a>
        </p>
      );
    }
    return (
      <p>
        <a href="#" onClick={handleLogout}>Logout</a>
      </p>
    );
  }

  return (
    <div className="container footer">
      <div className="container footer-inner">
        <div className="row middle">
          <div className="logo"></div>
          <div className="footer-links">
            {getLogout()}
            <p>
              <a href="https://www.iubenda.com/privacy-policy/84558472/cookie-policy">
                Cookie Policy
              </a>
            </p>
            <p>
              <a href="https://www.iubenda.com/privacy-policy/84558472/">
                Privacy Policy
              </a>
            </p>
            <p>
              raccoonfantasy.com from Mirai Bay srl
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer;
