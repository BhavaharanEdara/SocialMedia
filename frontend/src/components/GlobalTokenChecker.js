import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setTokenExpired } from "../features/users/userSlice";

const GlobalTokenChecker = () => {
  const tokenExpired = useSelector((state) => state.user.tokenExpired);
  const dispatch = useDispatch();
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (tokenExpired && !hasShownToast) {
      dispatch(setTokenExpired(false));
      toast.error("Token Expired. Please login again.");
      setHasShownToast(true);
    }
  }, [tokenExpired, dispatch, hasShownToast]);

  return null;
};

export default GlobalTokenChecker;
