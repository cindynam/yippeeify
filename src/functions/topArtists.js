export const fetchTopArtists = async (token, timeframe) => {
    try {
        let userTopArtists = await fetch(`${import.meta.env.VITE_REACT_API}/topartists?token=${token}&timeframe=${timeframe}`, {
            method: 'GET',
        });
        userTopArtists = await userTopArtists.json();
        return userTopArtists;

    } catch (error) {
        console.log('Error fetching top artists: ', error);
    }
}