import { ApiContext } from "@/presentation/context/api/api-context";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { getCurrentAccount } = useContext(ApiContext);

  if (!getCurrentAccount?.()?.token) {
    return <Navigate
	to={"/login"}
	replace
           />;
  }
  return (

	<Outlet />

  );
};
