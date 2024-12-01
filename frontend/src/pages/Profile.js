import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  logOutUser,
  updateUser,
} from "../features/users/userSlice";
import { Link, useNavigate } from "react-router-dom";
import UsersSidebar from "../components/UsersSidebar";
import { getPosts } from "../features/posts/postSlice";

const Profile = () => {
  const user = useSelector((state) => state.user.profile);

  const [fullname, setfullName] = useState(user.fullname);
  const [bio, setBio] = useState(user.bio);
  const [img, setImg] = useState(user.img);
  const [edit, setEdit] = useState(false);

  const imgUrls = [
    "https://static.vecteezy.com/system/resources/previews/006/631/154/non_2x/portrait-of-caucasian-woman-avatar-of-female-person-icon-of-adult-in-flat-style-headshot-vector.jpg",
    "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
    "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    "https://static.vecteezy.com/system/resources/previews/006/487/912/non_2x/hacker-avatar-ilustration-free-vector.jpg",
    "https://static.vecteezy.com/system/resources/previews/002/002/280/non_2x/old-man-with-beard-wearing-glasses-avatar-character-free-vector.jpg",
  ];

  const allPosts = useSelector((state) => state.post.posts);
  const postsStatus = useSelector((state) => state.post.status);

  const userPosts = allPosts?.filter((post) => post.postedBy === user?._id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOutUser());
    navigate("/login");
  };

  const handleUpdate = () => {
    dispatch(updateUser({ data: { bio, img, fullname }, id: user._id }));
    setEdit(false);
  };
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getAllUsers());
  }, []);
  useEffect(() => {
    if (!user._id) {
      navigate("/login");
    }
  });
  return (
    <div className="vh-100">
      <Header />
      <div className="bg-body-secondary">
        <div className="py-5 h-100">
          <div className="container h-100">
            <div className="row h-100">
              <div className="col-md-2 sidebar-height d-lg-block d-none">
                <Sidebar />
              </div>
              {user?._id ? (
                <div className="col-lg-6">
                  {!edit ? (
                    <div className="text-center">
                      <img
                        src={
                          user.img ? user.img : "https://placehold.co/400x400"
                        }
                        className="img-fluid rounded-circle"
                        width={100}
                        height={100}
                        alt="Profile"
                      />
                      <div className="ps-2">
                        <h5>{user?.fullname}</h5>
                        <div className="text-secondary">@{user?.username}</div>
                        <p className="mt-3">{user?.bio}</p>
                      </div>
                      <div className="d-flex gap-5 justify-content-center">
                        <div>
                          <p className="fw-bold">
                            {user?.following?.length || 0}
                          </p>
                          <div className="fw-semibold">Following</div>
                        </div>
                        <div>
                          <p className="fw-bold">{userPosts?.length || 0}</p>
                          <div className="fw-semibold">Posts</div>
                        </div>
                        <div>
                          <p className="fw-bold">
                            {user?.followers?.length || 0}
                          </p>
                          <div className="fw-semibold">Followers</div>
                        </div>
                      </div>
                      <button
                        className="px-4 my-4 border border-1 border-secondary-subtle fw-semibold "
                        onClick={() => setEdit(true)}
                      >
                        <small>Edit Profile</small>
                      </button>
                      <button
                        className="px-4 my-4 border border-1 border-secondary-subtle ms-3 fw-semibold"
                        onClick={handleLogout}
                      >
                        <small>Log out</small>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <label className="text-center w-100 pb-2">
                        Select Avatar
                      </label>
                      <div className="d-flex justify-content-center gap-3 mb-3 flex-wrap">
                        {imgUrls.map((url) => (
                          <img
                            key={url}
                            src={url}
                            className={`img img-fluid rounded-circle ${
                              img === url ? "opacity-50" : ""
                            }`}
                            width={80}
                            height={80}
                            alt="Profile"
                            onClick={() => setImg(url)}
                          />
                        ))}
                      </div>
                      <label> Full Name</label>
                      <input
                        className="w-100 py-1 px-2"
                        type="text"
                        value={fullname}
                        onChange={(e) => setfullName(e.target.value)}
                      />

                      <label className="pt-3"> Bio</label>
                      <input
                        className="w-100 py-1 px-2"
                        type="text"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                      <button
                        className=" bg-primary border-0  text-white px-3 py-1 mt-3"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                      <button
                        className="ms-3 bg-red border-0  text-white px-3 py-1 mt-3"
                        onClick={() => setEdit(!edit)}
                      >
                        Cancle
                      </button>
                    </div>
                  )}
                  <h5 className="py-2 fw-bold">Your Posts</h5>
                  {postsStatus === "fulfilled" &&
                  (userPosts?.length === 0 || !userPosts) ? (
                    <p>No posts available</p>
                  ) : (
                    userPosts?.map((post) => (
                      <div key={post?._id}>
                        <PostCard {...post} />
                      </div>
                    ))
                  )}
                  {postsStatus === "pending" && <p>Loading Posts...</p>}
                  {postsStatus === "rejected" && <p>Failed to Load Posts</p>}
                </div>
              ) : (
                <div className="col-lg-6 mb-4 text-center">
                  <p className="text-center">Please Login to Continue</p>
                  <Link to="/login">
                    <button className=" bg-red border-0  text-white px-3 py-1">
                      Login
                    </button>
                  </Link>
                </div>
              )}
              <UsersSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
