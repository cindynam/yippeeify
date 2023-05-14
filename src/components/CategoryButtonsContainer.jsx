export default function CategoryButtonsContainer({
    displayTopSongs,
    setDisplayTopSongs,
    displayTopArtists,
    setDisplayTopArtists,
    displayRecommended,
    setDisplayRecommended,
    fetchRecommendedData,
    setPlaylistLink,
    setShowPlaylist
}) {

    return (
        <div className="category-button-group">
            <button
                className={`button ${displayTopSongs ? "active" : ""}`}
                id="category-button"
                onClick={() => {
                    setDisplayTopSongs(true);
                    setDisplayTopArtists(false);
                    setDisplayRecommended(false);
                }}
            >
                Top Songs
            </button>
            <button
                className={`button ${displayTopArtists ? "active" : ""}`}
                id="category-button"
                onClick={() => {
                    setDisplayTopSongs(false);
                    setDisplayTopArtists(true);
                    setDisplayRecommended(false);
                }}
            >
                Top Artists
            </button>
            <button
                className={`button ${displayRecommended ? "active" : ""}`}
                id="category-button"
                onClick={() => {
                    setDisplayTopSongs(false);
                    setDisplayTopArtists(false);
                    setDisplayRecommended(true);
                    // Refreshes the recommended songs when the button is clicked
                    let button = document.querySelector(".active");
                    if (button.innerHTML === "Recommended") {
                        fetchRecommendedData();
                        setPlaylistLink("");
                        setShowPlaylist(false);
                    }
                }}
            >
                Recommended
            </button>
        </div>
    );
}
