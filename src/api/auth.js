import axios from "axios";
import environment from "../config";

export const SignUp = async (user) => {
  const url = `${environment.apiUrl}auth/signup`;
  const response = await axios.post(url, user);
  return response.data;
};

export const LogIn = async (user) => {
  const url = `${environment.apiUrl}auth/login`;
  const response = await axios.post(url, user);
  return response.data;
};
