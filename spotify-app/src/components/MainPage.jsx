import { useState, useEffect } from 'react';
import './MainPage.css';
import { getUserData } from './userData';
import { fetchTopSongs } from './topSongs';
import { fetchTopArtists } from './topArtists';

export default function MainPage({ token, userLogout }) {
  const [userData, setUserData] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [songTimeframe, setSongTimeframe] = useState('short_term');
  const [artistTimeframe, setArtistTimeframe] = useState('short_term');
  const [displayTopSongs, setDisplayTopSongs] = useState(true);

  // Format the duration of the song to minutes:seconds
  const formatDuration = (seconds) => {
    let str = ''
    str += Math.trunc(seconds / 60);
    let s = seconds % 60;
    str += s < 10 ? `:0${s}` : `:${s}`;
    return str;
  }


  // Fetches user data from the Spotify API and updates the userData state.
  // Called whenever the token value changes.
  useEffect(() => {
    // Define an async function to fetch the user data.
    const fetchData = async () => {
      // Call the getUserData function with the token value and wait for the result.
      const userData = await getUserData(token);
      // Update the userData state with the fetched data.
      setUserData(userData);
    };
    // Call the fetchData function to initiate the data fetching process.
    fetchData();
  }, [token]);


  // Fetches top songs from the Spotify API and updates the topSongs state.
  // Called whenever the token or songTimeframe values change.
  useEffect(() => {
    const fetchData = async () => {
      const topSongsData = await fetchTopSongs(token, songTimeframe);
      setTopSongs(topSongsData.data);
    };
    fetchData();
  }, [token, songTimeframe]);

  // Fetches top artists from the Spotify API and updates the topArtists state.
  // Called whenever the token or artistTimeframe values change.
  useEffect(() => {
    const fetchData = async () => {
      const topArtistsData = await fetchTopArtists(token, artistTimeframe);
      setTopArtists(topArtistsData.data);
    };
    fetchData();
  }, [token, artistTimeframe]);



  return (
    <>
      <div className="logout-button">
        <button name="logoutButton" onClick={() => userLogout()}>Logout</button>
      </div>
      {/* Display user info with a greeting */}
      {userData && (
        <div className="user-info">
          <img src={userData.profile_image} id="user-icon"></img>
          <h1>Hello, {userData.username}!</h1>
        </div>
      )}
      <div className="category-button-group">
        <button
          className={`category-button ${displayTopSongs ? "active" : ""}`}
          onClick={() => setDisplayTopSongs(true)}>Top Songs</button>
        <button
          className={`category-button ${!displayTopSongs ? "active" : ""}`}
          onClick={() => setDisplayTopSongs(false)}>Top Artists</button>
      </div>

      {displayTopSongs && topSongs ? (
        <div className="top-songs">
          <div>
            <button onClick={() => setSongTimeframe("short_term")}>1 Month</button>
            <button onClick={() => setSongTimeframe("medium_term")}>6 Months</button>
            <button onClick={() => setSongTimeframe("long_term")}>All Time</button>
          </div>
          <br></br>
          <br></br>
          {/* Display top 9 songs in a grid */}
          <div className="song-grid">
            {topSongs.slice(0, 9).map(song => (
              <div className="song-container">
                <img className="song-image" src={song.image} alt={song.name} />
                <div className="song-overlay">
                  <div className="song-details">
                    <p>{song.name}</p>
                    <p>by {song.artists}</p>
                    <p>Duration: {formatDuration(song.duration)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="top-artists">
          <div>
            <button onClick={() => setArtistTimeframe("short_term")}>1 Month</button>
            <button onClick={() => setArtistTimeframe("medium_term")}>6 Months</button>
            <button onClick={() => setArtistTimeframe("long_term")}>All Time</button>
          </div>
          <br></br>
          <br></br>
          {/* Display top 9 artists in a grid */}
          <div className="artist-grid">
            {topArtists.slice(0, 9).map((artist) => (
              <div className="artist-container">
                <img className="artist-image" src={artist.image} alt={artist.name} />
                <div className="artist-overlay">
                  <div className="artist-details">
                    <p>{artist.name}</p>
                    <p>Popularity: {artist.popularity}</p>
                    <p>Genre: {artist.genre}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
      }
      <br></br>
      <div className="footer">
        <p>Created by <a href="https://github.com/cindynam">Cindy Nam</a></p>
      </div>
    </>
  );
}