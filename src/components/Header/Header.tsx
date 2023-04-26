import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../_assets/images/argentBankLogo.png";

import { tokenService } from "../../_services/token.services";

import "./header.css";

const Header = () => {
  // récuperere username ou data avec redux !!!
  const userName = null;
  const navigate = useNavigate();

  const logout = () => {
    tokenService.logout();
    navigate("/");
  };

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/home">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
        </Link>

        {userName ? (
          <ul>
            <li className="main-nav-item">
              <Link to="/profil">
                <i className="fa-solid fa-circle-user"></i>
                Tony
              </Link>
            </li>
            <li onClick={logout} className="main-nav-item">
              <Link to="/home">
                <i className="fa-solid fa-sign-out"></i>
                Sign Out
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li className="main-nav-item">
              <Link to="/sign-in">
                <i
                  style={{
                    paddingTop: "3px",
                    paddingRight: "5px",
                    textAlign: "center",
                  }}
                  className="fa-solid fa-circle-user"
                ></i>
                Sign In
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
