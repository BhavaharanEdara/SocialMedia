import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, resetError } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user.profile);
  const userStatus = useSelector((state) => state.user.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    dispatch(loginUser({ email, password }));
  };
  useEffect(() => {
    if (user && user._id) {
      navigate("/posts");
    }
  }, [user]);
  useEffect(() => {
    dispatch(resetError());
  }, []);
  return (
    <div className="bg-light screen">
      <div className="container py-5">
        <div className="py-5">
          <h1 className="fw-logo text-center ">
            <span className="text-red">My</span> Website
          </h1>
          <div className="d-flex justify-content-center flex-column align-items-center ">
            <div className=" col-lg-5 col-md-7 rounded-3 p-lg-5 p-3  bg-white mt-3">
              <h2 className="text-center fw-bold">Login</h2>

              {userStatus === "rejected" && (
                <div className="text-center">
                  <small className="text-danger text-center">
                    Invalid Email or Password
                  </small>
                </div>
              )}
              <label className="pt-3 fw-normal ">Email Address</label>
              <input
                className="p-2 w-100 rounded border border-1 border-dark"
                value={email}
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="pt-3 fw-normal ">Password</label>
              <input
                className="p-2 w-100 rounded border border-1 border-dark"
                value={password}
                placeholder="*******"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="d-flex justify-content-between py-3">
                <div>
                  <label>
                    <input type="checkbox" /> Remember Me
                  </label>
                </div>
                <Link to="/forgotPassword" className="no-underline">
                  Forgot Password ?
                </Link>
              </div>
              {email && password ? (
                <input
                  type="submit"
                  value="Login"
                  className="w-100 bg-red text-white py-2 border-0"
                  onClick={handleLogin}
                />
              ) : (
                <button
                  value="Login"
                  className="w-100 bg-secondary text-white py-2 border-0 "
                >
                  Login
                </button>
              )}
              <p className="text-blue text-center fs-6 pt-2">
                <Link to="/signUp" className="no-underline text-black">
                  Create New Account {">"}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
