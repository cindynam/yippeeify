export const fetchTopArtists = async (token, timeframe) => {
    let userTopArtists = await fetch(`${import.meta.env.VITE_REACT_API}/topartists?token=${token}&timeframe=${timeframe}`,{
        method: 'GET',
    });
    userTopArtists = await userTopArtists.json();
    return userTopArtists;
}