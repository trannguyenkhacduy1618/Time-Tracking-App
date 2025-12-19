import api from "./api";

const USER_KEY = "current_user";
const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY;

/**
 * Login
 */
const login = async (username, password) => {
  const response = await api.post(
    "/auth/login",
    new URLSearchParams({
      username,
      password,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const { access_token, user } = response.data;

  localStorage.setItem(TOKEN_KEY, access_token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return user;
};

/**
 * Register
 */
const register = async ({
  username,
  email,
  full_name,
  password,
}) => {
  const response = await api.post(
    "/auth/register",
    {
      username,
      email,
      full_name,
      password,
      role: "user",
      is_active: true,
    }
  );

  return response.data;
};

/**
 * Logout
 */
const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const getToken = () => localStorage.getItem(TOKEN_KEY);

const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

const isAuthenticated = () => !!getToken();

export default {
  login,
  register,
  logout,
  getToken,
  getCurrentUser,
  isAuthenticated,
};
