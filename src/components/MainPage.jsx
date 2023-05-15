import './MainPage.css';
import DomToImage from 'dom-to-image';
import TopSongsContainer from './TopSongsContainer';
import CategoryButtonsContainer from './CategoryButtonsContainer';
import TopArtistsContainer from './TopArtistsContainer';
import RecommendedSongsContainer from './RecommendedSongsContainer';
import { useState, useEffect } from 'react';
import { getUserData } from '../functions/userData';
import { fetchTopSongs } from '../functions/topSongs';
import { fetchTopArtists } from '../functions/topArtists';
import { fetchRecommendedSongs } from '../functions/recommendedSongs';
import { createPlaylist } from '../functions/createPlaylist';

export default function MainPage({ token, userLogout }) {
  const [userData, setUserData] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [displayTopSongs, setDisplayTopSongs] = useState(true);
  const [displayRecommended, setDisplayRecommended] = useState(false);
  const [displayTopArtists, setDisplayTopArtists] = useState(false);
  const [songTimeframe, setSongTimeframe] = useState('short_term');
  const [artistTimeframe, setArtistTimeframe] = useState('short_term');
  const [playlistLink, setPlaylistLink] = useState('');


  // Format the duration of the song to minutes:seconds
  const formatDuration = (seconds) => {
    let str = '';
    str += Math.trunc(seconds / 60);
    let s = seconds % 60;
    str += s < 10 ? `:0${s}` : `:${s}`;
    return str;
  }

  // Download the stats as a png image.
  const imageDownload = () => {
    const grid = document.querySelector('.grid');
    try {
      DomToImage.toPng(grid).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'yippeeify-stats.png';
        link.href = dataUrl;
        link.click();
      });
    } catch (error) {
      console.error('Error generating image: ', error);
    }
  }

  // Fetches recommended songs from the Spotify API and updates the recommendedSongs page.
  const fetchRecommendedData = async () => {
    try {
      const recommendedSongsData = await fetchRecommendedSongs(token);
      setRecommendedSongs(recommendedSongsData.data);
    } catch (error) {
      console.error('Error refreshing recommended songs data: ', error);
    }
  };

  // Creates a playlist from the recommended songs and updates the playlistLink state.
  const createRecommendedPlaylist = async () => {
    setShowPlaylist('loading');
    let songUris = recommendedSongs.map(song => song.uri).join(',');
    let playlistData = await createPlaylist(token, userData.id, songUris);
    let link = `https://open.spotify.com/embed/playlist/${playlistData.playlistId}`;
    setPlaylistLink(link);
    // Wait 2 seconds before displaying the playlist to make sure the embed is displayed properly.
    setTimeout(() => {
      setShowPlaylist(true);
    }, 2000);
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

  // Fetches recommended songs for the user from the Spotify API.
  useEffect(() => {
    fetchRecommendedData();
  }, [token]);



  return (
    <>
      <button
        className="button"
        id="logout-button"
        onClick={() => userLogout()}
      >
        Logout
      </button>
      {/* Display user info with a greeting */}
      {userData && (
        <div className="user-info">
          <img src={userData.profile_image} id="user-icon"></img>
          <h1>Hello, {userData.username}!</h1>
        </div>
      )}
      {/* Display buttons to switch between top songs, top artists, and recommended songs */}
      <CategoryButtonsContainer
        displayTopSongs={displayTopSongs}
        setDisplayTopSongs={setDisplayTopSongs}
        displayRecommended={displayRecommended}
        setDisplayRecommended={setDisplayRecommended}
        displayTopArtists={displayTopArtists}
        setDisplayTopArtists={setDisplayTopArtists}
        fetchRecommendedData={fetchRecommendedData}
        setPlaylistLink={setPlaylistLink}
        setShowPlaylist={setShowPlaylist}
      />
      <div className="stats-container">
        {/* Display top songs, top artists, or recommended songs depending on button pressed */}
        {displayTopSongs && topSongs ? (
          <TopSongsContainer
            songTimeframe={songTimeframe}
            setSongTimeframe={setSongTimeframe}
            topSongs={topSongs}
            formatDuration={formatDuration}
          />
        ) : displayTopArtists && topArtists ? (
          <TopArtistsContainer
            artistTimeframe={artistTimeframe}
            setArtistTimeframe={setArtistTimeframe}
            topArtists={topArtists}
          />
        ) : (
          <RecommendedSongsContainer
            recommendedSongs={recommendedSongs}
            createRecommendedPlaylist={createRecommendedPlaylist}
            playlistLink={playlistLink}
            showPlaylist={showPlaylist}
            formatDuration={formatDuration}
          />
        )}
      </div>
      {/* Button to download the stats as a png image. */}
      <button
        className="button"
        id="download-button"
        onClick={imageDownload}
      >
        Download Image
      </button>
    </>
  );
}
