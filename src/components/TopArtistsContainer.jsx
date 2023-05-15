export default function TopArtistsContainer({ topArtists, artistTimeframe, setArtistTimeframe }) {
    const timeframeButtons = ["short_term", "medium_term", "long_term"].map((tf) => (
        <button
            key={tf}
            className={`button ${artistTimeframe === tf ? "active" : ""}`}
            onClick={() => setArtistTimeframe(tf)}
        >
            {tf === "short_term" ? "1 Month" : tf === "medium_term" ? "6 Months" : "All Time"}
        </button>
    ));

    const artistItems = topArtists
        .slice(0, 9)
        .map((artist) => (
            <div key={artist.name} className="container">
                <img className="image" src={artist.image} alt={artist.name} />
                <div className="overlay">
                    <div className="details">
                        <p>
                            <a href={artist.link}>{artist.name}</a>
                        </p>
                        <p>Popularity: {artist.popularity}</p>
                        <p>Genre: {artist.genre}</p>
                    </div>
                </div>
            </div>
        ));

    return (
        <div className="top-artists">
            <div className="timeframe-buttons">
                {timeframeButtons}
            </div>
            {/* Display top 9 artists in a grid */}
            <div className="grid">
                {artistItems}
            </div>
        </div>
    );
}
