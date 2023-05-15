export const fetchRecommendedSongs = async (token) => {
    try {
        let recommendedSongs = await fetch(`${import.meta.env.VITE_REACT_API}/recommendedsongs?token=${token}`, {
            method: 'GET',
        });
        recommendedSongs = await recommendedSongs.json();
        return recommendedSongs;

    } catch (error) {
        console.log('Error fetching recommended songs: ', error);
    }
}