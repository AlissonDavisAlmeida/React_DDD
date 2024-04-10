import { makeLogin } from "@/main/factories/pages/login/login-factory";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div data-testid='home-page'>home</div>

  },
  {
    path: "/login",
    element: makeLogin()
  },
  {
    path: "/signup",
    element: <div data-testid='signup-page'>signup</div>
  }
]);
