import { useState, useEffect } from 'react';
import './MainPage.css';
import { getUserData } from './userData';
import { fetchTopSongs } from './topSongs';
import { fetchTopArtists } from './topArtists';
import { fetchRecommendedSongs } from './recommendedSongs';

export default function MainPage({ token, userLogout }) {
  const [userData, setUserData] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [songTimeframe, setSongTimeframe] = useState('short_term');
  const [artistTimeframe, setArtistTimeframe] = useState('short_term');
  const [displayTopSongs, setDisplayTopSongs] = useState(true);
  const [displayRecommended, setDisplayRecommended] = useState(false);
  const [displayTopArtists, setDisplayTopArtists] = useState(false);


  // Format the duration of the song to minutes:seconds
  const formatDuration = (seconds) => {
    let str = ''
    str += Math.trunc(seconds / 60);
    let s = seconds % 60;
    str += s < 10 ? `:0${s}` : `:${s}`;
    return str;
  }

  const fetchRecommendedData = async () => {
    const recommendedSongsData = await fetchRecommendedSongs(token);
    setRecommendedSongs(recommendedSongsData.data);
  };


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

  useEffect(() => {
    fetchRecommendedData();
  }, [token]);


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
          onClick={() => {
            setDisplayTopSongs(true);
            setDisplayTopArtists(false);
            setDisplayRecommended(false);
          }}>Top Songs</button>
        <button
          className={`category-button ${displayTopArtists ? "active" : ""}`}
          onClick={() => {
            setDisplayTopSongs(false);
            setDisplayTopArtists(true);
            setDisplayRecommended(false);
          }}>Top Artists</button>
        <button
          className={`category-button ${displayRecommended ? "active" : ""}`}
          onClick={() => {
            setDisplayTopSongs(false);
            setDisplayTopArtists(false);
            setDisplayRecommended(true);
            // Refreshes the recommended songs when the button is clicked
            let button = document.querySelector(".active");
            if (button.innerHTML === "Recommended") {
              fetchRecommendedData();
            }
          }}>Recommended</button>
      </div>
      <div className="stats-container">
        {/* Display top songs or top artists depending on the displayTopSongs state */}
        {displayTopSongs && topSongs ? (
          <div className="top-songs">
            <div className="song-timeframe-buttons">
              <button className={songTimeframe === "short_term" ? "active" : ""} onClick={() => setSongTimeframe("short_term")}>1 Month</button>
              <button className={songTimeframe === "medium_term" ? "active" : ""} onClick={() => setSongTimeframe("medium_term")}>6 Months</button>
              <button className={songTimeframe === "long_term" ? "active" : ""} onClick={() => setSongTimeframe("long_term")}>All Time</button>
            </div>
            <br></br>
            <br></br>
            {/* Display top 9 songs in a grid */}
            <div className="grid">
              {topSongs.slice(0, 9).map(song => (
                <div className="container">
                  <img className="image" src={song.image} alt={song.name} />
                  <div className="overlay">
                    <div className="details">
                      <p><a href={song.link}>{song.name}</a></p>
                      <p>{song.artists}</p>
                      <p>Duration: {formatDuration(song.duration)}</p>
                      <p>Popularity: {song.popularity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : displayTopArtists && topArtists ? (
          <div className="top-artists">
            <div className="artist-timeframe-buttons">
              <button className={artistTimeframe === "short_term" ? "active" : ""} onClick={() => setArtistTimeframe("short_term")}>1 Month</button>
              <button className={artistTimeframe === "medium_term" ? "active" : ""} onClick={() => setArtistTimeframe("medium_term")}>6 Months</button>
              <button className={artistTimeframe === "long_term" ? "active" : ""} onClick={() => setArtistTimeframe("long_term")}>All Time</button>
            </div>
            <br></br>
            <br></br>
            {/* Display top 9 artists in a grid */}
            <div className="grid">
              {topArtists.slice(0, 9).map((artist) => (
                <div className="container">
                  <img className="image" src={artist.image} alt={artist.name} />
                  <div className="overlay">
                    <div className="details">
                      <p><a href={artist.link}>{artist.name}</a></p>
                      <p>Popularity: {artist.popularity}</p>
                      <p>Genre: {artist.genre}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="recommended-songs">
            <h2> Recommended for you!</h2>
            <h3> (pssst! you can click the button again to get new recommendations!)</h3>
            <div className="grid">
              {recommendedSongs.slice(0, 9).map(song => (
                <div className="container">
                  <img className="image" src={song.image} alt={song.name} />
                  <div className="overlay">
                    <div className="details">
                      <p><a href={song.link}>{song.name}</a></p>
                      <p>{song.artists}</p>
                      <p>Duration: {formatDuration(song.duration)}</p>
                      <p>Popularity: {song.popularity}</p>
                      {song.previewUrl === null ? <p>Preview not available</p> :
                        <p>
                        <audio controls>
                          <source src={song.previewUrl} type='audio/mp3' />
                        </audio>
                      </p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
        }
      </div >
      <br></br>
    </>
  );
}

// Maybe change the grid div classnames to the same so they are the same format and not cluttering the .css