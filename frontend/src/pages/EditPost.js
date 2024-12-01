import React, { useEffect, useState } from "react";
import { GrEmoji } from "react-icons/gr";
import { MdAddPhotoAlternate, MdOutlineGifBox } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { IoMdSearch } from "react-icons/io";
import { deletePost, updatePosts } from "../features/posts/postSlice";
import UserCard from "../components/UserCard";
import { getPosts } from "../features/posts/postSlice";
import UsersSidebar from "../components/UsersSidebar";
import { toast } from "react-toastify";

const EditPost = () => {
  const posts = useSelector((state) => state.post.posts);
  const postId = useParams().id;
  const post = posts.find((post) => post._id === postId);
  const postStatus = useSelector((state) => state.post.status);
  const users = useSelector((state) => state.user.users);
  const user = useSelector((state) => state.user.profile);
  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.description || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    dispatch(deletePost(postId)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Post Deleted");
      } else if (result.meta.requestStatus === "rejected") {
        toast.error("Failed to delete Post");
      }
    });
    if (postStatus === "fulfilled") {
      navigate("/posts");
    }
  };
  const handleUpdate = () => {
    const data = {
      data: {
        id: post._id,
        title,
        description,
      },
      id: post._id,
    };
    dispatch(updatePosts(data)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Post Updated");
      } else if (result.meta.requestStatus === "rejected") {
        toast.error("Failed to update Post");
      }
    });
  };
  useEffect(() => {
    dispatch(getPosts());
    if (!user._id) {
      navigate("/login");
    }
    if (post && user._id != post.postedBy) {
      navigate("/posts");
    }
  }, []);
  useEffect(() => {
    setTitle(post?.title || "");
    setDescription(post?.description || "");
  }, [post]);
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
                <div className="px-4 py-3 bg-white">
                  <input
                    placeholder="Title"
                    className="w-100 bg-body-secondary textarea-no-border px-3 py-2 my-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    type="textarea"
                    className="w-100 bg-body-secondary textarea-no-border px-3 py-2"
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
                        className=" bg-primary border-0  text-white px-3 py-1"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                      <button
                        className=" bg-red border-0  text-white px-3 py-1 ms-3"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <UsersSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
