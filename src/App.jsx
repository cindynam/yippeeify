import { useState } from 'react';
import './App.css';
import MainPage from './components/MainPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // If there is no token and the url includes 'code', then fetch the token from the backend.
  if (!token && window.location.href.includes('code')) {
    let uri = window.location.href.split('&state=');
    let state = uri[1];
    let auth_code = uri[0].split('code=')[1];
    if(localStorage.getItem('state') === state){
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
        localStorage.removeItem('state');
        window.location.replace(import.meta.env.VITE_REACT_URL);
      });
    }
    else {
      window.location.replace(import.meta.env.VITE_REACT_URL);
    }
  }

  // Logs user in by fetching the url from the backend and redirecting the user to the url.
  const userLogin = async () => {
    let data = await fetch(`${import.meta.env.VITE_REACT_API}/login`);
    data = await data.json();
    localStorage.setItem('state',data.state);
    window.location.replace(data.url);
  }

  // Logs user out by removing the token from local storage and setting the token to null.
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
            <img src="./welcome.png" alt="welcome-image" className="welcome-img"></img></button>
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
