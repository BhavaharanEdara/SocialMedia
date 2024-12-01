import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getAllUsers,
  unfollowUser,
} from "../features/users/userSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UsersSidebar from "../components/UsersSidebar";

const UserProfile = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.user.users);
  const user = useSelector((state) => state.user.profile);
  const followingIndex = user.following?.findIndex((userId) => userId === id);
  const curuser = users.find((user) => user._id === id);
  const allPosts = useSelector((state) => state.post.posts);
  const posts = allPosts?.filter((post) => post.postedBy === curuser?._id);
  const dispatch = useDispatch();
  const handleFollow = () => {
    if (user._id) {
      dispatch(followUser({ data: { id: curuser._id }, id: user._id }));
    } else {
      toast.error("Please Login");
    }
  };

  const handleUnfollow = () => {
    if (user._id) {
      dispatch(unfollowUser({ data: { id: curuser._id }, id: user._id }));
    } else {
      toast.error("Please Login");
    }
  };
  useEffect(() => {
    dispatch(getAllUsers());
  }, [user]);
  return (
    <div className="vh-100">
      <Header />
      <div className="bg-body-secondary">
        <div className="py-5 h-100">
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-md-2 sidebar-height d-lg-block d-none ">
                <Sidebar />
              </div>
              <div className="col-lg-6">
                <div className="text-center">
                  <img
                    src={curuser?.img || "https://placehold.co/400x400"}
                    className="img-fluid rounded-circle"
                    width={100}
                    height={100}
                    alt="Profile"
                  />
                  <div className="ps-2">
                    <h5>{curuser?.fullname}</h5>
                    <div>@{curuser?.username}</div>
                    <p className="py-2">{curuser?.bio}</p>
                  </div>
                  {!user.following || followingIndex === -1 ? (
                    <button
                      className="bg-red text-white  fw-semibold border-0 px-4 py-1"
                      onClick={handleFollow}
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      className="px-4 py-1 border-red text-red fw-semibold"
                      onClick={handleUnfollow}
                    >
                      Unfollow
                    </button>
                  )}
                  <div className="d-flex gap-5 justify-content-center py-2 rounded-1">
                    <div className="fw-bold">
                      {curuser?.following?.length || 0}
                      <div className="fw-semibold">Following</div>
                    </div>
                    <div className="fw-bold">
                      {posts?.length || 0}
                      <div className="fw-semibold">Posts</div>
                    </div>
                    <div className="fw-bold">
                      {curuser?.followers?.length || 0}
                      <div className="fw-semibold">Followers</div>
                    </div>
                  </div>
                </div>
                <h3 className="pt-4">User Posts</h3>
                {posts?.length === 0 || !posts ? (
                  <p>No posts available</p>
                ) : (
                  posts?.map((post) => (
                    <div key={post._id}>
                      <PostCard {...post} />
                    </div>
                  ))
                )}
              </div>
              <UsersSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
