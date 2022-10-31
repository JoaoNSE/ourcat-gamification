import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//Separate into Subservice (one for each entity)

async function getMe() {
  try {
    return (await api.get(`/auth/me`)).data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function login(email, password) {
  try {
    return (
      await api.post(
        `/auth/login`,
        { email, password },
        { withCredentials: true }
      )
    ).data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function logout() {
  try {
    await api.get(`/auth/logout`);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const ApiWrapperService = {
  api,
  getMe,
  login,
  logout,
};

export default ApiWrapperService;
