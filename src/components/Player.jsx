import React from 'react';
import './Player.scss';

const Player = (props) => {

  return (
    <div className="player row">
      <div className="username">{props.username}</div>
      <div>#{props.rank}</div>
    </div>
  )
}
export default Player;
