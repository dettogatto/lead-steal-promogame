import './App.scss';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LeaderboardPage from './pages/LeaderboardPage';


function App() {
  return (
    <>
    <Routes>
      <Route index element={<LoginPage />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="*" element={<span>There&apos;s no raccoon here: 404!</span>} />
    </Routes>
    </>
);
}

export default App;
