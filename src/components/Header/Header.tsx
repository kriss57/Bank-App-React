import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../_assets/images/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { tokenService } from "../../_services/token.services";

import "./header.css";

interface RootState {
  userInfo: {
    firstName: string;
    lastName: string;
    checked: boolean;
  };
}

const Header = () => {
  const dispatch = useDispatch();
  const rememberMe = useSelector((state: RootState) => state.userInfo.checked);
  const firstNameStore = useSelector(
    (state: RootState) => state.userInfo.firstName
  );

  useEffect(() => {
    const firstNameLocalStorage = localStorage.getItem("firstName");

    if (localStorage.getItem("firstName")) {
      dispatch({
        type: "userInfo/setFirstName",
        payload: firstNameLocalStorage,
      });
    }
  }, [rememberMe, dispatch]);

  console.log(rememberMe);

  const navigate = useNavigate();

  const logout = () => {
    if (!rememberMe) {
      tokenService.logout();
      navigate("/");
    }
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

        {firstNameStore ? (
          <ul className="main-ul">
            <li className="main-nav-item">
              <Link to="/auth/profil">
                <i
                  className="fa-solid fa-circle-user"
                  style={{
                    paddingRight: "10px",
                    color: "rgb(142, 159, 199)",
                  }}
                ></i>
                {firstNameStore}
              </Link>
            </li>
            <li onClick={logout} className="main-nav-item">
              <Link to="/home">
                <i
                  className="fa-solid fa-sign-out"
                  style={{ paddingRight: "10px" }}
                ></i>
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
                    paddingRight: "10px",
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
