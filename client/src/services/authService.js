import axios from "axios";
import axiosInstance from "../utils/axios";

const API = `${import.meta.env.VITE_API_URL}/api/auth`;

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API}/login`, {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API}/register`, {
    name,
    email,
    password,
  });

  return response.data;
};
