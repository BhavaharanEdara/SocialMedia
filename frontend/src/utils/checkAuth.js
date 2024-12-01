import { jwtDecode } from "jwt-decode";
import {
  setTokenExpired,
  loginUser,
  setUser,
} from "../features/users/userSlice";
import { useDispatch } from "react-redux";

export const checkAuth = (dispatch) => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        dispatch(setTokenExpired(true));
        localStorage.removeItem("token");
      } else {
        dispatch(setUser(decodedToken));
      }
    } catch (error) {
      console.error("Token decoding failed", error);
      dispatch(setTokenExpired(true));
    }
  }
};
