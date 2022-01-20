import axios from "axios";
import environment from "../config";
import { getToken } from "./token";

export const getUserData = () => {
  const token = getToken();
  if (token) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    return axios.get(`${environment.apiUrl}users`, config);
  }
};

export const editAddress = (userAddress) => {
  const token = getToken();
  if (token) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };

    // send the user address json as "address" in the body
    return axios.put(
      `${environment.apiUrl}users/address`,
      { address: userAddress },
      config
    );
  }
};
