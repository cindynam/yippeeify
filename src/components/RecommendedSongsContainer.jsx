export default function RecommendedSongsContainer({
    recommendedSongs,
    showPlaylist,
    createRecommendedPlaylist,
    playlistLink,
    formatDuration
}) {

    return (
        <div className="recommended-songs">
            <div class="recommended-header">
                <p> Recommended for you!</p>
                <p class="subtext"> (pssst! you can click the button again to get new recommendations!)</p>
            </div>
            <div className="grid">
                {/* Displaying 9 of the recommended songs. */}
                {recommendedSongs?.slice(0, 9).map(song => (
                    <div className="container" key={song.link}>
                        <img className="image" src={song.image} alt={song.name} />
                        <div className="overlay">
                            <div className="details">
                                <p><a href={song.link}>{song.name}</a></p>
                                <p>{song.artists}</p>
                                <p>Duration: {formatDuration(song.duration)}</p>
                                <p>Popularity: {song.popularity}</p>
                                {/* If the song has no preview, display a message. Otherwise, display the audio player. */}
                                {song.previewUrl === null ? (
                                    <p>preview unavailable</p>
                                ) : (
                                    <p>
                                        <audio key={song.previewUrl} controls>
                                            <source src={song.previewUrl} type='audio/mp3' />
                                        </audio>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="playlist" >
                {/* If the playlist hasn't been created yet, display the button. If it's loading, display a loading icon. If it's ready, display the playlist. */}
                {showPlaylist === false ? (
                    <button className="playlist-button" onClick={() => createRecommendedPlaylist()}>
                        Make it into a playlist!
                    </button>
                ) : showPlaylist === 'loading' ? (
                    <div className="loading" />
                ) : (
                    <iframe
                        className='embedPlayer'
                        src={playlistLink}
                        key={playlistLink}
                        width="100%"
                        height="152"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
                        loading="eager"
                    >
                    </iframe>
                )}
            </div>
        </div>
    );
}