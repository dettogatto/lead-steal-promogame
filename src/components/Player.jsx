import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/slices/auth-slice';


const Player = (props) => {

  const auth = useSelector(selectUser);

  const getFlag = () => {
    if(auth && props.username === auth.username){
      return (<div className="flag active"></div>);
    } else {
      return (<div className="flag"></div>);
    }
  }

  return (
    <div className="player row middle">
      { getFlag() }
      <div className="username"><h1>{props.username}</h1></div>
    </div>
  )
}
export default Player;
