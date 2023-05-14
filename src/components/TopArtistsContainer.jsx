export default function TopArtistsContainer({ topArtists, artistTimeframe, setArtistTimeframe }) {

    return (
        <div className="top-artists">
            <div className="artist-timeframe-buttons">
                <button
                    className={artistTimeframe === "short_term" ? "active" : ""}
                    onClick={() => setArtistTimeframe("short_term")}
                >
                    1 Month
                </button>
                <button className={artistTimeframe === "medium_term" ? "active" : ""}
                    onClick={() => setArtistTimeframe("medium_term")}
                >
                    6 Months
                </button>
                <button className={artistTimeframe === "long_term" ? "active" : ""}
                    onClick={() => setArtistTimeframe("long_term")}
                >
                    All Time
                </button>
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
    )
}