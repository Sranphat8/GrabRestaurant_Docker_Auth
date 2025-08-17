const getUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null; // ถ้าไม่มี user ให้ return null
  try {
    return JSON.parse(userStr);
  } catch (err) {
    console.error("Error parsing user from localStorage", err);
    return null;
  }
};


const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getLocalAccessToken = () => {
  const user = getUser();
  return user?.token;
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const TokenService = {
  getLocalAccessToken,
  getUser,
  setUser,
  removeUser,
};
export default TokenService;
