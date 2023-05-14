export default function RecommendedSongsContainer({ recommendedSongs, showPlaylist, createRecommendedPlaylist, playlistLink, formatDuration }) {
    return (
        <div className="recommended-songs">
            <h2> Recommended for you!</h2>
            <h3> (pssst! you can click the button again to get new recommendations!)</h3>
            <div className="grid">
                {recommendedSongs?.slice(0, 9).map(song => (
                    <div className="container">
                        <img className="image" src={song.image} alt={song.name} />
                        <div className="overlay">
                            <div className="details">
                                <p><a href={song.link}>{song.name}</a></p>
                                <p>{song.artists}</p>
                                <p>Duration: {formatDuration(song.duration)}</p>
                                <p>Popularity: {song.popularity}</p>
                                {song.previewUrl === null ? <p>preview unavailable</p> :
                                    <p>
                                        <audio key={song.previewUrl} controls>
                                            <source src={song.previewUrl} type='audio/mp3' />
                                        </audio>
                                    </p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="playlist" >
                {showPlaylist === false ? (
                    <button className="playlist-button" onClick={() => createRecommendedPlaylist()}>
                        make it into a playlist!
                    </button>
                ) : showPlaylist === 'loading' ? (<div className="loading" />) : (
                    <iframe
                        className='embedPlayer'
                        src={playlistLink}
                        width="100%"
                        height="152"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
                    >
                    </iframe>
                )}
            </div>
        </div>
    )
}