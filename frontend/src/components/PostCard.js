import React, { useEffect } from "react";
import {
  BiBookmark,
  BiComment,
  BiDislike,
  BiEdit,
  BiLike,
  BiShare,
  BiSolidBookmark,
  BiSolidLike,
} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updatePosts } from "../features/posts/postSlice";
import {
  addBookMark,
  addLikedPost,
  removeBookMark,
  removeLikedPost,
  setTokenExpired,
} from "../features/users/userSlice";
import { toast } from "react-toastify";

const PostCard = ({
  _id,
  title,
  description,
  likes,
  comments,
  postedBy,
  updatedAt,
  createdAt,
}) => {
  const user = useSelector((state) => state.user.profile);
  const users = useSelector((state) => state.user.users);
  const tokenExpired = useSelector((state) => state.user.tokenExpired);

  const postedUser = users.find((curUser) => curUser._id === postedBy);

  const dispatch = useDispatch();
  let likedindex = -1;
  if (user && user.liked) {
    likedindex = user?.liked?.findIndex((id) => id === _id);
  }
  let bookMarkIndex = -1;
  if (user && user.bookmarks) {
    bookMarkIndex = user?.bookmarks?.findIndex((id) => id === _id);
  }
  const handleLike = () => {
    if (user._id) {
      if (likedindex == -1) {
        dispatch(updatePosts({ id: _id, data: { likes: likes + 1 } }));
        dispatch(addLikedPost({ data: { id: _id }, userId: user._id }));
      } else {
        dispatch(updatePosts({ id: _id, data: { likes: likes - 1 } }));
        dispatch(removeLikedPost({ data: { id: _id }, userId: user._id }));
      }
    } else {
      toast.error("Please Login");
    }
  };

  const handleBookMark = () => {
    if (user._id) {
      if (bookMarkIndex == -1) {
        dispatch(addBookMark({ data: { id: _id }, userId: user._id }));
      } else {
        dispatch(removeBookMark({ data: { id: _id }, userId: user._id }));
      }
    } else {
      toast.error("Please Login");
    }
  };
  function timeAgo(timestamp) {
    const now = new Date();
    const pastDate = new Date(timestamp);
    const diffInMs = now - pastDate;

    const msInSecond = 1000;
    const msInMinute = msInSecond * 60;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;
    const msInMonth = msInDay * 30;
    const msInYear = msInDay * 365;

    let timeString = "";

    if (diffInMs < msInMinute) {
      const seconds = Math.floor(diffInMs / msInSecond);
      timeString = `${seconds} seconds ago`;
    } else if (diffInMs < msInHour) {
      const minutes = Math.floor(diffInMs / msInMinute);
      timeString = `${minutes} minutes ago`;
    } else if (diffInMs < msInDay) {
      const hours = Math.floor(diffInMs / msInHour);
      timeString = `${hours} hours ago`;
    } else if (diffInMs < msInMonth) {
      const days = Math.floor(diffInMs / msInDay);
      timeString = `${days} days ago`;
    } else if (diffInMs < msInYear) {
      const months = Math.floor(diffInMs / msInMonth);
      timeString = `${months} months ago`;
    } else {
      const years = Math.floor(diffInMs / msInYear);
      timeString = `${years} years ago`;
    }

    return timeString;
  }

  return (
    <div className="bg-white rounded-1 p-3 mb-3" key={_id}>
      <div className="d-flex gap-4">
        <div>
          <img
            src={postedUser?.img || "https://placehold.co/400x400"}
            className="img-fluid rounded-circle "
            width={50}
            height={50}
            alt="Profile"
          />
        </div>
        <div className="w-100">
          <div className="d-flex align-items-center justify-content-between">
            <p className="fw-semibold fs-6 curson-pointer">
              <Link
                to={`/profile/${postedBy}`}
                className="cursor-pointer text-dark no-underline"
              >
                {postedUser?.fullname}
              </Link>{" "}
              <span className="text-secondary fs-6">
                @{postedUser?.username} • {timeAgo(createdAt)}
              </span>
            </p>
            {user?._id === postedBy && (
              <Link to={`/post/edit/${_id}`} className="no-underline">
                <BiEdit className="me-2 text-success" />
              </Link>
            )}
          </div>
          <h5 className="pb-3 fs-6 fw-bold">{title}</h5>
          <pre className="post-description">{description}</pre>
          <div className="d-flex justify-content-between pt-2">
            <div className="d-flex gap-2 align-items-center ">
              {likedindex == -1 ? (
                <BiLike className="fs-5 cusrsor-pointer" onClick={handleLike} />
              ) : (
                <BiSolidLike
                  className="fs-5 cusrsor-pointer"
                  onClick={handleLike}
                />
              )}{" "}
              <span>{likes}</span>
            </div>
            <BiComment className="fs-5 cusrsor-pointer" />
            <BiShare className="fs-5 cusrsor-pointer" />
            {bookMarkIndex == -1 ? (
              <BiBookmark
                className="fs-5 me-2 cusrsor-pointer"
                onClick={handleBookMark}
              />
            ) : (
              <BiSolidBookmark
                className="fs-5 me-2 cusrsor-pointer"
                onClick={handleBookMark}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
