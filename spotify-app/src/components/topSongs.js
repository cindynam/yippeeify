export const fetchTopSongs = async (token, timeframe) => {
    let userTopSongs = await fetch(`http://localhost:3001/topsongs?token=${token}&timeframe=${timeframe}`,{
        method: 'GET',
    });
    userTopSongs = await userTopSongs.json();
    return userTopSongs;
}