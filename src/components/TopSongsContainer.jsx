export default function TopSongsContainer({ topSongs, songTimeframe, setSongTimeframe, formatDuration }) {
    
    return (
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
    )
}