import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  followUser,
  getAllUsers,
  unfollowUser,
} from "../features/users/userSlice";
import { toast } from "react-toastify";

const UserCard = ({ fullname, username, _id, img }) => {
  const user = useSelector((state) => state.user.profile);
  const followingIndex = user.following?.findIndex((userId) => userId == _id);

  const dispatch = useDispatch();

  const handleFollow = () => {
    if (user._id) {
      dispatch(followUser({ data: { id: _id }, id: user._id }));
    } else {
      toast.error("Please Login");
    }
  };

  const handleUnfollow = () => {
    if (user._id) {
      dispatch(unfollowUser({ data: { id: _id }, id: user._id }));
    } else {
      toast.error("Please Login");
    }
  };
  return (
    <>
      {_id !== user._id ? (
        <div key={_id} className="pt-4">
          <div className="d-flex align-items-center justify-content-between">
            <img
              src={img || "https://placehold.co/400x400"}
              className="img img-fluid rounded-circle"
              width={50}
              height={50}
              alt="Profile"
            />
            <div>
              <div>
                <Link
                  to={`/profile/${_id}`}
                  className="text-black no-underline fw-semibold"
                >
                  <div
                    className="overflow-hidden text-center"
                    style={{ height: "24px", width: "100px" }}
                  >
                    {fullname}
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  to={`/profile/${_id}`}
                  className=" no-underline text-secondary text-center "
                >
                  <div
                    className="overflow-hidden text-center"
                    style={{ height: "24px", width: "100px" }}
                  >
                    @{username}
                  </div>
                </Link>
              </div>
            </div>
            {!user.following || followingIndex == -1 ? (
              <div
                className="text-red cursor-pointer fw-bold"
                onClick={handleFollow}
              >
                <small className="fs-6">
                  Follow <span className="fs-3 fw-light">+</span>
                </small>
              </div>
            ) : (
              <div
                className="text-red cursor-pointer fw-bold"
                onClick={handleUnfollow}
              >
                <small>Unfollow</small>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserCard;
