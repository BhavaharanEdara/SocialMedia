import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../features/posts/postSlice";
import { getAllUsers } from "../features/users/userSlice";
import UserCard from "../components/UserCard";
import UsersSidebar from "../components/UsersSidebar";

const BookMarks = () => {
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.user.profile).bookmarks;
  const allPosts = useSelector((state) => state.post.posts);
  const postsStatus = useSelector((state) => state.post.status);
  const posts = bookmarks?.map((id) => {
    const find = allPosts.find((post) => id == post._id);
    return find;
  });
  console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getAllUsers());
  }, []);
  useEffect(() => {
    if (!user._id) {
      navigate("/login");
    }
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
              <div className="col-lg-6">
                <h5 className="py-2 fw-bold">Your Bookmarks</h5>
                {postsStatus == "pending" && <p>Loading ...</p>}
                {postsStatus == "rejected" && <p>Failed to load Posts...</p>}
                {posts &&
                  posts?.map((post) => <PostCard {...post} key={post?._id} />)}
              </div>
              <UsersSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMarks;
