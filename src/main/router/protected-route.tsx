import React, { useContext } from "react";
import { ApiContext } from "@/presentation/context/api/api-context";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { getCurrentAccount } = useContext(ApiContext);

  if (!getCurrentAccount() || !getCurrentAccount()?.token) {
    return <Navigate
	to={"/login"}
	replace
           />;
  }
  return (

	<Outlet />

  );
};
