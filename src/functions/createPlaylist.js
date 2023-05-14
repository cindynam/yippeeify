export const createPlaylist = async (token, userId, songUris) => {
    let playlist = await fetch(`${import.meta.env.VITE_REACT_API}/createplaylist?token=${token}&userId=${userId}&songUris=${songUris}`, {
        method: 'GET',
    });
    playlist = await playlist.json();
    return playlist;
}