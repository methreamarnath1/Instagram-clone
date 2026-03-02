import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API}/api/auth`,
  withCredentials: true,
});

async function register(username, email, password) {
  try {
    const res = await api.post(
      "/register",
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}

async function login(username, password) {
  try {
    const res = await api.post(
      "/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      },
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}

export { register, login };

export async function getMe() {
  try{
    const response = await api.get("/get-me", {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  } 
   
}