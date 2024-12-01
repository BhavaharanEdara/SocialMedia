import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { PiRocket } from "react-icons/pi";
import { BsBookmark } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const user = useSelector((state) => state.user.profile);
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="d-flex flex-column justify-content-between fixed-sidebar">
      <div>
        <p>
          <Link
            to="/posts"
            className="text-dark no-underline d-flex align-items-center gap-4 "
          >
            <IoHomeOutline />{" "}
            <span
              className={`${path === "/posts" ? "fw-bold" : "fw-semibold"}`}
            >
              Home
            </span>
          </Link>
        </p>
        <p>
          <Link
            to="/explore"
            className="text-dark no-underline d-flex align-items-center gap-4 "
          >
            <PiRocket />{" "}
            <span
              className={`${path === "/explore" ? "fw-bold" : "fw-semibold"}`}
            >
              Explore
            </span>
          </Link>
        </p>
        <p>
          <Link
            to="/bookmarks"
            className="text-dark no-underline d-flex align-items-center gap-4"
          >
            <BsBookmark />{" "}
            <span
              className={`${path === "/bookmarks" ? "fw-bold" : "fw-semibold"}`}
            >
              Bookmarks
            </span>
          </Link>
        </p>
        <p>
          <Link
            to="/profile"
            className="text-dark no-underline d-flex align-items-center gap-4"
          >
            <FaRegUser />{" "}
            <span
              className={`${path === "/profile" ? "fw-bold" : "fw-semibold"}`}
            >
              {" "}
              Profile
            </span>
          </Link>
        </p>
        <Link to="/posts">
          <button className="py-2 mt-3 bg-red text-white w-75 border-0 ">
            <small>Create Post</small>
          </button>
        </Link>
      </div>
      <div>
        {user?._id ? (
          <div className="d-flex align-items-center ">
            <img
              src={user?.img || "https://placehold.co/400x400"}
              className="img-fluid rounded-circle"
              width={50}
              height={50}
              alt="Profile"
            />
            <Link className="ps-2 no-underline text-dark" to="/profile">
              <div className="fw-semibold">{user?.fullname}</div>
              <div className="text-secondary">@{user?.username}</div>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <button className=" bg-red border-0  text-white w-75 py-2">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
