import React from "react";
import Home from "./Home";
import { Link, NavLink } from "react-router-dom";
import { BrowserRouter, useNavigate } from "react-router-dom";

const Navbar = () => {
  let reloadWindow = () => {
    if (localStorage.getItem("AuthToken")) {
      alert("found  1 user");
    } else {
      alert("please login first ");
    }
    window.location.reload();
  };
  let reloadOnly = () => {
    window.location.reload();
  };

  let handlelogout = () => {
    localStorage.removeItem("AuthToken");
    alert("logged out successfully ");
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <BrowserRouter>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto ">
              <li className="nav-item ">
                <NavLink
                  onChange={reloadWindow}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending nav-link "
                      : isActive
                      ? "active nav-link text-light"
                      : "nav-link text-light "
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-light"
                  to="/about"
                  // onClick={reloadOnly}
                >
                  About
                </NavLink>
              </li>
            </ul>
            {!localStorage.getItem("AuthToken") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-primary  mx-1"
                  role="button"
                  to="/login"
                >
                  login
                </Link>
                <Link
                  className="btn btn-primary  mx-1"
                  role="button"
                  to="/signup"
                >
                  Sign UP
                </Link>
              </form>
            ) : (
              <button className="btn btn-primary  mx-1" onClick={handlelogout}>
                Log out{" "}
              </button>
            )}
          </div>
        </BrowserRouter>
      </nav>
    </>
  );
};

export default Navbar;
