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
  const [gameEnded, setGameEnded] = useState(false);
  const auth = useSelector(selectUser);
  const configs = useSelector(selectConfigs);

  useEffect(() =>  {
    refreshBoard();
    let interval = setInterval(refreshBoard, LEADERBOARD_REFRESH_INTERVAL);
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
    <>
    <div className="container no-padding">
      <RankTeller rank={myRank} username={auth.username} />
      <p className="intro">
        Fai clic sul pulsante e prendi posto sulla nave! <br />
        Ogni volta ti verrà assegnato un posto a caso nella metà superiore della classifica. <br />
        Assicurati uno dei 50 posti prima che la nave salpi per vincere il nostro esclusivo NFT!
      </p>
      <Stealer gameEnded={gameEnded} refreshBoard={refreshBoard} />
      <Countdown gameEnded={gameEnded} setGameEnded={setGameEnded} />
      <div className="players-container container">
        {getPlayers()}
      </div>
    </div>
    <div className="footer-ship"></div>
    </>
)
}
export default LeaderboardPage;
