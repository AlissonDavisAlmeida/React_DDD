import { ApiContext } from "@/presentation/context/api/api-context";
import { Outlet } from "react-router-dom";
import { setCurrentAccountAdapter } from "../adapter/current-account-adapter";

export const ProtectedRoute = () => {
  return (
	<ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter }}>

		<Outlet />

	</ApiContext.Provider>
  );
};
