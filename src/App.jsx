import { useState } from 'react';
import './App.css';
import MainPage from './components/MainPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  if (!token && window.location.href.includes('callback')) {
    let auth_code = window.location.href.split('code=')[1];
    fetch(`${import.meta.env.VITE_REACT_API}/token`, {
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
    let url = await fetch(`${import.meta.env.VITE_REACT_API}/login`);
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
          <h1 className="rotated-title">
            <span>y</span><span>i</span><span>p</span><span>p</span><span>e</span><span>e</span><span>i</span><span>f</span><span>y</span></h1>
          <h2>yippee! welcome! click the cat to login to spotify!</h2>
          <button name="loginButton" onClick={userLogin}>
            <img src="./welcome2.png" alt="welcome-image" className="welcome-img"></img></button>
        </div>
      ) : (
        <>
          <MainPage token={token} userLogout={userLogout} />
        </>
      )}
      <div className="footer">
        <p>Created by <a href="https://github.com/cindynam">Cindy Nam</a></p>
      </div>
    </>
  )
};

export default App;
