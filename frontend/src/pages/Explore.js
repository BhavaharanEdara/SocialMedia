import React, { useDebugValue, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../features/posts/postSlice";
import { getAllUsers } from "../features/users/userSlice";
import UsersSidebar from "../components/UsersSidebar";

const Explore = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const postsStatus = useSelector((state) => state.post.status);
  const dispatch = useDispatch();

  let allPosts = useSelector((state) => state.post.posts);

  let posts = [...allPosts];
  posts.sort((post1, post2) => {
    if (sortBy === "createdAt") {
      return new Date(post2.createdAt) - new Date(post1.createdAt);
    } else if (sortBy === "likes") {
      return (post2.likes?.length || 0) - (post1.likes?.length || 0);
    }
    return 0;
  });

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getAllUsers());
  }, []);

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
              <div className="col-lg-6 ">
                <div className="d-flex justify-content-between pb-2 align-items-center">
                  <h5 className="fw-bold">Explore</h5>
                  <div className="d-flex align-items-center w-50 justify-content-between">
                    <label className="">Sort By:</label>
                    <select
                      className="form-select w-75"
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="createdAt">Date Posted</option>
                      <option value="likes">Likes</option>
                    </select>
                  </div>
                </div>
                {postsStatus == "pending" && <p>Loading ...</p>}
                {postsStatus == "rejected" && <p>Failed to load Posts...</p>}
                {posts.map((post) => (
                  <PostCard {...post} key={post._id} />
                ))}
              </div>
              <UsersSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
