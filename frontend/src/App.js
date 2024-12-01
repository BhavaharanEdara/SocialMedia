import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { Link } from "react-router-dom";
function App() {
  return (
    <div className="container  h-screen d-md-flex align-items-center">
      <div className="row d-flex justify-content-around py-3 px-3 ">
        <div className="col-lg-5 col-md-6 mb-3">
          <div className="d-flex flex-column justify-content-between h-100 ps-lg-5">
            <h1 className="fw-logo">
              <span className="text-red">My</span> Website
            </h1>
            <div className="py-3 py-lg-0">
              <p>
                <span className="fs-3 fw-bold text-body-tertiary">FOLLOW</span>{" "}
                <span className="small-txt fw-semibold">
                  PEOPLE AROUND THE GLOBE
                </span>
              </p>
              <p>
                <span className="fs-3 fw-bold text-body-tertiary">CONNECT</span>{" "}
                <span className="small-txt fw-semibold">WITH YOUR FRIENDS</span>
              </p>
              <p>
                <span className="fs-3 fw-bold text-body-tertiary">SHARE</span>{" "}
                <span className="small-txt fw-semibold">WHAT YOU THINKING</span>
              </p>
            </div>
            <div>
              <Link to="/signUp">
                <button className="w-100 py-3 bg-red text-white border-0">
                  Join Now
                </button>
              </Link>
              <div>
                <Link
                  className="d-flex justify-content-center pt-2 text-red fs-6 no-underline"
                  to="/login"
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-md-6">
          <img
            src="https://placehold.co/1125x1200?text=Banner"
            alt="banner"
            className="img img-fluid "
          />
        </div>
      </div>
    </div>
  );
}

export default App;
