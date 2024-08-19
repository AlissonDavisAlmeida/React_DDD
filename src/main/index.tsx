import { router } from "@/main/router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@/presentation/styles/global.scss";
import { ApiContext } from "@/presentation/context/api/api-context";
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from "./adapter/current-account-adapter";

const root = createRoot(document.getElementById("main") as HTMLElement);

root.render(

	<StrictMode>
		<ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter, getCurrentAccount: getCurrentAccountAdapter }}>
			<RouterProvider router={router}/>
		</ApiContext.Provider>
	</StrictMode>
);
