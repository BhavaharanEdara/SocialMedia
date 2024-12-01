import React from "react";
import { BsBookmark } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { PiRocket } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="container py-2 d-lg-block d-none">
        <Link to="/" className="no-underline">
          <h1 to="/" className="fs-4 fw-normal text-black ">
            <span className="text-red">My</span>Website
          </h1>
        </Link>
      </div>

      <nav className="navbar navbar-expand-lg d-lg-none">
        <div className="container container-fluid ">
          <Link className="no-underline" to="/"><h1 to="/" className="fs-4 fw-normal text-black no-underline">
            <span className="text-red">My</span>Website
          </h1></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav pt-3">
              <li><p ><Link to="/posts" className='text-dark no-underline d-flex align-items-center gap-4 '><IoHomeOutline /> <span className="fw-semibold">Home</span></Link></p></li>
              <li><p><Link to="/explore" className='text-dark no-underline d-flex align-items-center gap-4 '><PiRocket /> <span className='fw-semibold'>Explore</span></Link></p></li>
              <li><p><Link to="/bookmarks" className='text-dark no-underline d-flex align-items-center gap-4'><BsBookmark /> <span className='fw-semibold'>Bookmarks</span></Link></p></li>
              <li><p><Link to="/profile" className='text-dark no-underline d-flex align-items-center gap-4'><FaRegUser /> <span className='fw-semibold'> Profile</span></Link></p></li>
              <li><Link to="/posts"><button className='py-2 mt-3 bg-red text-white w-100 border-0 '><small>Create Post</small></button></Link></li>
            </ul>
          </div>
          </div>
      </nav>
    </>
  );
};

export default Header;
