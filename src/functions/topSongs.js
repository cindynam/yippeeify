export const fetchTopSongs = async (token, timeframe) => {
    try {
        let userTopSongs = await fetch(`${import.meta.env.VITE_REACT_API}/topsongs?token=${token}&timeframe=${timeframe}`, {
            method: 'GET',
        });
        userTopSongs = await userTopSongs.json();
        return userTopSongs;

    } catch (error) {
        console.log('Error fetching top songs: ', error);
    }
}