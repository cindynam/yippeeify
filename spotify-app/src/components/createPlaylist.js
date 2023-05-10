export const createPlaylist = async (token, userId, songUris) => {
    let playlist = await fetch(`http://localhost:3001/createplaylist?token=${token}&userId=${userId}&songUris=${songUris}`, {
        method: 'GET',
    });
    playlist = await playlist.json();
    return playlist;
}