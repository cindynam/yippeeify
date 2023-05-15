export const getUserData = async (token) => {
    try {
        let userData = await fetch(`${import.meta.env.VITE_REACT_API}/user?token=${token}`, {
            method: 'GET',
        });
        userData = await userData.json();
        return userData;

    } catch (error) {
        console.log('Error fetching user data: ', error);
    }
}