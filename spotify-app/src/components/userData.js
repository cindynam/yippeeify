export const getUserData = async (token) => {
    let userData = await fetch(`http://localhost:3001/user?token=${token}`, {
        method: 'GET',
    });
    userData = await userData.json();
    return userData;
}