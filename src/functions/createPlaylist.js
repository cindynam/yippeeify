export const createPlaylist = async (token, userId, songUris) => {
    try {
        let playlist = await fetch(`${import.meta.env.VITE_REACT_API}/createplaylist?token=${token}&userId=${userId}&songUris=${songUris}`, {
            method: 'GET',
        });
        playlist = await playlist.json();
        return playlist;
        
    } catch (error) {
        console.log('Error creating recommended playlist: ', error);
    }
}