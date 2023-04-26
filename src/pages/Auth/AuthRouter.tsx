import React from "react";
import { Route, Routes } from "react-router-dom";

import Error from "../../_utils/Error";
import Profil from "../Profil/Profil";
import AuthGuard from "../../_helpers/AuthGuard";

const AuthRouter = () => {
  return (
    <AuthGuard>
      <Routes>
        <Route index element={<Profil />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </AuthGuard>
  );
};

export default AuthRouter;
