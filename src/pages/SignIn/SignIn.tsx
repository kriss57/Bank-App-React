import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenService } from "../../_services/token.services";
import { requestService } from "../../_services/request.service";
import { useDispatch } from "react-redux";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({ email: "steve@rogers.com", password: "password456" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await requestService.login(formData);

      let token = res.data.body.token;
      tokenService.saveToken(token);

      navigate("/auth/profil");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const dispatch = useDispatch();
  const handleRemember = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "userInfo/isRememberMe",
      payload: event.target.checked,
    });
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa-solid fa-circle-user sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="email"
              id="username"
              autoComplete="username"
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" onChange={handleRemember} id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
        <p>{formData.email}</p>
        <p>{formData.password}</p>
      </section>
    </main>
  );
};

export default SignIn;
