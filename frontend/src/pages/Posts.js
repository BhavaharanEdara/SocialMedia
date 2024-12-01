import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { MdAddPhotoAlternate } from "react-icons/md";
import { MdOutlineGifBox } from "react-icons/md";
import { GrEmoji } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../features/posts/postSlice";
import PostCard from "../components/PostCard";
import { getAllUsers } from "../features/users/userSlice";
import { toast } from "react-toastify";
import UsersSidebar from "../components/UsersSidebar";

const Posts = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const user = useSelector((state) => state.user.profile);
  const posts = useSelector((state) => state.post.posts);

  const postsStatus = useSelector((state) => state.post.status);

  const dispatch = useDispatch();

  const handlePost = async () => {
    if (user._id) {
      dispatch(addPost({ title, description, postedBy: user._id })).then(
        (result) => {
          if (result.meta.requestStatus === "fulfilled") {
            toast.success("Created Post");
          } else if (result.meta.requestStatus === "rejected") {
            toast.error("Failed to create Post");
          }
        }
      );
    } else {
      toast.error("Please Login");
    }
  };

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
              <div className="col-lg-6">
                <div className="px-4 py-3 bg-white">
                  <input
                    placeholder="Title"
                    className="w-100 bg-body-secondary textarea-no-border px-3 py-2 my-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    type="textarea"
                    className="w-100 bg-body-secondary textarea-no-border px-3 py-2 fs-6"
                    placeholder="Write something interesting..."
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <div className="bg-white d-flex justify-content-between align-items-center pt-1">
                    <div>
                      <MdAddPhotoAlternate className="me-3 fs-5" />
                      <MdOutlineGifBox className="me-3 fs-5" />
                      <GrEmoji className="fs-5" />
                    </div>
                    <div>
                      <button
                        className=" bg-red border-0  text-white px-4 py-1"
                        onClick={handlePost}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
                <h4 className="py-2 fw-bold">Latest Posts</h4>
                {postsStatus == "pending" && <p>Loading Posts...</p>}
                {postsStatus == "rejected" && <p>Failed to load Posts...</p>}
                {postsStatus == "fulfilled" && posts.length === 0 ? (
                  <p>No posts available</p>
                ) : (
                  posts.map((post) => <PostCard {...post} key={post._id} />)
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

export default Posts;
