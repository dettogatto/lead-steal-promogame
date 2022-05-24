import React, { useState, useEffect } from 'react';
const RankTeller = (props) => {

  const getUsername = () => {
    if(props.username){
      return (<div className="name">{props.username}</div>);
    }
    return null;
  }

  const getRank = () => {
    if(props.rank){
      return (<div className="rank"><span>#{props.rank}</span></div>);
    }
    return null;
  }

  return (
    <div className="container rankteller-container">
      <div className="row middle center rankteller-container-inner">
        <div className="pirate-logo"></div>
        { getUsername() }
        { getRank() }
      </div>
    </div>
  )
}
export default RankTeller;
