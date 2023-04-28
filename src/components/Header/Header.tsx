import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../_assets/images/argentBankLogo.png";
import { useSelector } from "react-redux";
import { tokenService } from "../../_services/token.services";

import "./header.css";

interface RootState {
  userInfo: {
    firstName: string;
    lastName: string;
  };
}

const Header = () => {
  // récuperere username ou data avec redux !!!
  const userName = useSelector((state: RootState) => state.userInfo.firstName);
  const navigate = useNavigate();

  console.log(userName);

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
          <ul className="main-ul">
            <li className="main-nav-item">
              <Link to="/auth/profil">
                <i className="fa-solid fa-circle-user"></i>
                {userName}
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
          <ul className="main-ul">
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
