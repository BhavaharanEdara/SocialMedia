import React from "react";
import { IoMdSearch } from "react-icons/io";
import UserCard from "../components/UserCard";
import { useSelector } from "react-redux";

const UsersSidebar = () => {
  const users = useSelector((state) => state.user.users);
  return (
    <div className="col-lg-4 d-lg-block ">
      <div className="px-lg-3 bg-body-secondary">
        <div className="d-flex align-items-center bg-white border border-1 border-secondary rounded-0 p-3">
          <IoMdSearch className="fs-5" />
          <input
            placeholder="Search Posts, People, Anything"
            className="w-100 textarea-no-border text-sm ms-2 "
          />
        </div>
        <div className="bg-white mt-4 p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="fw-bold">Who to Follow?</h6>
            <p className="text-red fw-bold">Show More</p>
          </div>
          <hr className="my-1" />
          {users?.map((user) => (
            <UserCard key={user._id} {...user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersSidebar;
