export const fetchTopArtists = async (token, timeframe) => {
    let userTopArtists = await fetch(`http://localhost:3001/topartists?token=${token}&timeframe=${timeframe}`,{
        method: 'GET',
    });
    userTopArtists = await userTopArtists.json();
    return userTopArtists;
}