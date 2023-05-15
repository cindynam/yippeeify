export default function TopSongsContainer({ topSongs, songTimeframe, setSongTimeframe, formatDuration }) {
    const timeframeButtons = ["short_term", "medium_term", "long_term"].map((tf) => (
        <button
            key={tf}
            className={`button ${songTimeframe === tf ? "active" : ""}`}
            onClick={() => setSongTimeframe(tf)}
        >
            {tf === "short_term" ? "1 Month" : tf === "medium_term" ? "6 Months" : "All Time"}
        </button>
    ));

    const songItems = topSongs
        .slice(0, 9)
        .map((song) => (
            <div key={song.name} className="container">
                <img className="image" src={song.image} alt={song.name} />
                <div className="overlay">
                    <div className="details">
                        <p>
                            <a href={song.link}>{song.name}</a>
                        </p>
                        <p>{song.artists}</p>
                        <p>Duration: {formatDuration(song.duration)}</p>
                        <p>Popularity: {song.popularity}</p>
                    </div>
                </div>
            </div>
        ));

    return (
        <div className="top-songs">
            <div className="timeframe-buttons">
                {timeframeButtons}
            </div>
            {/* Display top 9 songs in a grid */}
            <div className="grid">
                {songItems}
            </div>
        </div>
    );
}