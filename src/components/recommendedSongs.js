export const fetchRecommendedSongs = async (token) => {
    let recommendedSongs = await fetch(`${import.meta.env.VITE_REACT_API}/recommendedsongs?token=${token}`,{
        method: 'GET',
    });
    recommendedSongs = await recommendedSongs.json();
    return recommendedSongs;
}