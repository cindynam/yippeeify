export const getUserData = async (token) => {
    let userData = await fetch(`${import.meta.env.VITE_REACT_API}/user?token=${token}`, {
        method: 'GET',
    });
    userData = await userData.json();
    return userData;
}