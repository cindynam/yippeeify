import React, { useState } from 'react';

export default function RecommendedSongsContainer({
    recommendedSongs,
    showPlaylist,
    createRecommendedPlaylist,
    playlistLink,
    formatDuration
}) {
    const [currentAudio, setCurrentAudio] = useState(null);

    // If the user clicks on a new audio player, pause the current one and set the new one as the current one.
    const handleAudioClick = (e) => {
        let audioElement = e.target;
        if (currentAudio && currentAudio !== audioElement) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        setCurrentAudio(audioElement);
    };

    const recommendedItems = recommendedSongs
        .slice(0, 9)
        .map((song) => (
            <div className="container" key={song.link}>
                <img className="image" src={song.image} alt={song.name} />
                <div className="overlay">
                    <div className="details">
                        <p>
                            <a href={song.link}>{song.name}</a>
                        </p>
                        <p>{song.artists}</p>
                        <p>Duration: {formatDuration(song.duration)}</p>
                        <p>Popularity: {song.popularity}</p>
                        {/* If the song has no preview, display a message. Otherwise, display the audio player. */}
                        {song.previewUrl === null ? (
                            <p>preview unavailable</p>
                        ) : (
                            <p>
                                <audio
                                    key={song.previewUrl}
                                    controls
                                    controlsList="nodownload noplaybackrate"
                                    onPlay={(e) => handleAudioClick(e)}
                                    volume={0.4}
                                >
                                    <source src={song.previewUrl} type="audio/mp3" />
                                </audio>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        ));

    {/* If the playlist hasn't been created yet, display the button. 
        If it's loading, display a loading icon. 
        If it's ready, display the playlist. */}
    const renderPlaylist = () => {
        if (showPlaylist === false) {
            return (
                <button
                    className="button"
                    id="playlist-button"
                    onClick={() => createRecommendedPlaylist()}
                >
                    Make it into a playlist!
                </button>
            );
        } else if (showPlaylist === 'loading') {
            return (
                <div className="loading" />
            );
        } else {
            return (
                <iframe
                    className="embedPlayer"
                    src={playlistLink}
                    key={playlistLink}
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
                    loading="eager"
                />
            );
        }
    };

    return (
        <div className="recommended-songs">
            <div className="recommended-header">
                <p>Recommended for you!</p>
                <p className="subtext">
                    (pssst! you can click the button again to get new recommendations!)
                </p>
            </div>
            <div className="grid">
                {recommendedItems}
            </div>
            <div className="playlist">
                {renderPlaylist()}
            </div>
        </div>
    );
}