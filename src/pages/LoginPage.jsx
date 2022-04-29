import React, { useState, useEffect } from 'react';
const LoginPage = (props) => {

  const [email, setEmail] = useState("");

  useEffect(() => {

  }, [email])

  const handleLogin = (e) => {
    e.preventDefault();
    window.location.replace('/leaderboard');
  }

  return (
    <div className="container fullscreen absolute">
      <div className="row middle center">
        <form>
          Your email:
          <input className="error" type="email" placeholder="magic.raccoon@give.me" />
          Your username:
          <input type="text" placeholder="RaccoonStealer42" />
          <button onClick={handleLogin}>Start Stealing!</button>
        </form>
      </div>
    </div>
  )
}
export default LoginPage;
