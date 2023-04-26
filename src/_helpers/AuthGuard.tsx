import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { tokenService } from "../_services/token.services";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  if (!tokenService.checkToken()) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
