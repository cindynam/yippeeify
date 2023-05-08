import { useState } from 'react';
import './App.css';
import MainPage from './components/MainPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token && window.location.href.includes('callback')) {
    let auth_code = window.location.href.split('code=')[1];
    fetch('http://localhost:3001/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: auth_code })
    }).then(t =>
      t.json()
    ).then((t) => {
      localStorage.setItem('token', t.token);
      window.location.replace('http://localhost:3000/');
    });
  }

  const userLogin = async () => {
    let url = await fetch('http://localhost:3001/login');
    url = await url.json();
    window.location.replace(url.url);
  }

  const userLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <>
      {token === null ? (
        <div className="title-page">
        <h1>yippee! hello! welcome to yippeeify!</h1>
        <img src="./welcome.png" alt="welcome-image" class="welcome-img"></img>
        <button name="loginButton" onClick={userLogin}>Login to Spotify</button>
      </div>
      ) : (
        <>
          <MainPage token={token} userLogout={userLogout} />
        </>
      )}
    </>
  )
};

export default App;
