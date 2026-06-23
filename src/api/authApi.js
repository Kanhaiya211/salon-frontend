import axios from "axios";

const BASE_URL = "https://salon-backend-vmzr.onrender.com";

export const signupUser = async (userData) => {
  return await axios.post(
    `${BASE_URL}/auth/signup`,
    userData
  );
};
export const loginUser = async (userData) => {
  return await axios.post(
    `${BASE_URL}/auth/login`,
    userData
  );
};