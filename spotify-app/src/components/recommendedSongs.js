export const fetchRecommendedSongs = async (token) => {
    let recommendedSongs = await fetch(`http://localhost:3001/recommendedsongs?token=${token}`,{
        method: 'GET',
    });
    recommendedSongs = await recommendedSongs.json();
    return recommendedSongs;
}