import React from "react";
import { Link } from "react-router-dom";
import { useNavigate,useLocation } from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    // setUserName("");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {localStorage.getItem("token") ? (
              <div className="d-flex align-items-center" style={{display:'flex', justifyContent:'space-between'}}>
                <button className="btn btn-primary" onClick={logOut}>
                  Logout
                </button>
                {(localStorage.getItem('token'))?<Link className="nav-link mx-4" style={{color:'white',fontSize:'20px'}} to="/info"><i className="fa-solid fa-user"></i></Link>:""}
              </div>
              
            ) : (
              <form className="d-flex" role="search">
                <Link className="btn btn-primary" to="/login" role="button">
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
