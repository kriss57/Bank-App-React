import { Routes, Route } from "react-router-dom";
import React from "react";

import Layout from "../pages/Layout";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import Error from "../_utils/Error";
import AuthRouter from "../pages/Auth/AuthRouter";

const RouterApp = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/auth/*" element={<AuthRouter />} />

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default RouterApp;
