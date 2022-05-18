import './Leaderboard.scss'
import React, { useState, useEffect } from 'react';
import Player from '../components/Player';
import Countdown from '../components/Countdown';
import RankTeller from '../components/RankTeller';
import Stealer from '../components/Stealer';
import {LEADERBOARD_REFRESH_INTERVAL} from '../settings';
import AxiosInstance from '../AxiosInstance';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/auth-slice';
import { selectConfigs } from '../store/slices/config-slice';

const LeaderboardPage = (props) => {

  const [board, setBoard] = useState([]);
  const [myRank, setMyRank] = useState(0);
  const auth = useSelector(selectUser);
  const configs = useSelector(selectConfigs);

  useEffect(() =>  {
    refreshBoard();
    let interval = setInterval(() => {refreshBoard()}, LEADERBOARD_REFRESH_INTERVAL);
    return (() => {
      clearInterval(interval);
    });
  }, [configs, auth]);

  const refreshBoard = () => {
    AxiosInstance.get('get.php').then((response) => {
      let brd = response.data;
      let rank = brd.indexOf(props.username) + 1;
      setMyRank(rank);
      setBoard(brd.slice(0, configs.maxWinners));
    });
  }

  const getPlayers = () => {
    return board.map((player, index) => {
      return (
        <Player username={player} key={index} rank={(index + 1)} />
      );
    });
  }

  return (
    <div className="container">
      <div className="header row">
        <Countdown />
        <RankTeller rank={myRank} />
        <Stealer />
      </div>
      <div className="players-container container">
        {getPlayers()}
      </div>
    </div>
  )
}
export default LeaderboardPage;
