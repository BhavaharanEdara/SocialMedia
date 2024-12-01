import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, resetError } from "../features/users/userSlice";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const SignUp = () => {
  const [fullname, setfullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [FieldMsg, setFieldMsg] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkdTerm, setCheckedTerm] = useState(false);
  const [checkedMessage, setCheckMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);
  const users = useSelector((state) => state.user.users);

  const isDuplicateUserName = users.find((user) => user.username == username);
  const isDuplicateEmail = users.find((user) => user.email == email);

  const createAccount = async (data) => {
    try {
      const response = await axios.post(`${base_url}/users`, data);
      navigate("/login");
    } catch (error) {
      toast.error("Some thing went wrong");
    }
  };
  const validateEmail = (email) => {
    const atIndex = email.indexOf("@");
    const dotIndex = email.indexOf(".");

    if (
      atIndex === -1 ||
      dotIndex === -1 ||
      dotIndex <= atIndex ||
      dotIndex === email.length - 1
    ) {
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldMsg("");
    setEmailMsg("");
    setCheckMessage("");
    if (isDuplicateEmail || isDuplicateUserName) {
      return;
    }
    if (email && !validateEmail(email)) {
      setEmailMsg("Invalid email");
    } else if (
      checkdTerm &&
      fullname &&
      username &&
      email &&
      password &&
      confirmPassword
    ) {
      if (password === confirmPassword) {
        await createAccount({ fullname, username, email, password });
      }
    } else if (
      !fullname ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setFieldMsg("All fields must be filled");
    } else if (!checkdTerm) {
      setCheckMessage("Please accept all Terms & Conditions");
    }
  };
  useEffect(() => {
    dispatch(resetError());
    dispatch(getAllUsers());
    if (user && user._id) {
      navigate("/posts");
    }
  }, []);
  return (
    <div className="bg-light screen">
      <div className="container">
        <div className="pt-2">
          <Link to="/" className="no-underline text-dark">
            <h1 className="fw-logo text-center fs-2">
              <span className="text-red">My</span> Website
            </h1>
          </Link>
          <div className="d-flex justify-content-center flex-column align-items-center ">
            <div className="col-md-5  rounded-1 px-lg-5 px-3 py-2 py-lg-4 bg-white mt-3">
              <h2 className="text-center fw-semibold">Signup</h2>
              <form onSubmit={handleSubmit}>
                <label className="pt-3 fw-normal ">Full Name</label>
                <input
                  className="p-2 w-100 rounded border border-1 border-dark"
                  placeholder="fullname"
                  value={fullname}
                  onChange={(e) => setfullName(e.target.value)}
                />
                <label className="pt-3 fw-normal ">Username</label>
                <input
                  className="p-2 w-100 rounded border border-1 border-dark"
                  value={username}
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                {isDuplicateUserName && isDuplicateUserName !== -1 && (
                  <div>
                    <small className="text-danger">
                      Username already in use
                    </small>
                  </div>
                )}
                <label className="pt-3 fw-normal ">Email</label>
                <input
                  className="p-2 w-100 rounded border border-1 border-dark"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailMsg && (
                  <div className="">
                    <small className="text-danger">{emailMsg}</small>
                  </div>
                )}
                {!emailMsg && isDuplicateEmail && isDuplicateEmail !== -1 && (
                  <div>
                    <small className="text-danger">Email already in use</small>
                  </div>
                )}
                <label className="pt-3 fw-normal ">Password</label>
                <input
                  className="p-2 w-100 rounded border border-1 border-dark"
                  type="password"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="pt-3 fw-normal ">Confirm Password</label>

                <input
                  className="p-2 w-100 rounded border border-1 border-dark"
                  value={confirmPassword}
                  placeholder="*******"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword && password !== confirmPassword && (
                  <small className="text-danger">Password doesnt Match</small>
                )}
                <br />

                <label className="cursor-pointer">
                  <input
                    type="checkbox"
                    className="my-4"
                    onChange={() => setCheckedTerm(!checkdTerm)}
                  />{" "}
                  <span className="my-3">I accept all Terms & Conditions</span>
                </label>
                {!checkdTerm && checkedMessage && !FieldMsg && (
                  <p>
                    <small className="text-danger">{checkedMessage}</small>
                  </p>
                )}
                {FieldMsg && (
                  <p className="text-center">
                    <small className="text-danger">{FieldMsg}</small>
                  </p>
                )}
                {fullname &&
                username &&
                email &&
                password &&
                confirmPassword &&
                checkdTerm ? (
                  <input
                    type="submit"
                    value="Create New Account"
                    className="w-100 bg-red text-white border-0 py-2"
                  />
                ) : (
                  <input
                    type="submit"
                    value="Create New Account"
                    className="w-100 bg-secondary text-white border-0  py-2"
                  />
                )}
                <p className="text-blue text-center fs-6 pt-4 ">
                  <Link to="/login" className="no-underline text-black">
                    Already have an account {">"}{" "}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
