import React, { useState, useEffect } from 'react';
import Player from '../components/Player';
import Countdown from '../components/Countdown';
import Stealer from '../components/Stealer';
import {MAX_WINNERS} from '../settings'

const players = [
  {
    username: "gatto",
    email: "ciao@ciao.it",
    timestamp: Date.now()
  },
  {
    username: "Mega",
    email: "ciao@ciao.it",
    timestamp: Date.now() - 120000
  },
  {
    username: "Tron",
    email: "ciao@ciao.it",
    timestamp: Date.now() - 110000
  },
  {
    username: "Hula",
    email: "ciao@ciao.it",
    timestamp: Date.now() - 150000
  },
]

const LeaderboardPage = (props) => {

  const getPlayers = () => {
    return players.sort((a, b) => (
      a.timestamp - b.timestamp
    )).slice(0, MAX_WINNERS).map((player, index) => {
      return (
        <Player username={player.username} key={index} rank={(index + 1)} />
      );
    });
  }

  return (
    <div className="container">
      <div className="header row">
        <Countdown />
        <Stealer />
      </div>
      <div className="players-container container">
        {getPlayers()}
      </div>
    </div>
  )
}
export default LeaderboardPage;
