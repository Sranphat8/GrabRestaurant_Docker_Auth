const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

const getLocalAccessToken = () => {
    // การที่ใช้ ? เป็นการย่อจาการใช้ใช้ if
    const user = getUser();
    return user?.token;
};

const removeUser = () => {
    localStorage.removeItem('user');
}

const tokenService = {
    getLocalAccessToken,
    getUser,
    setUser,
    removeUser,
};

export default tokenService;