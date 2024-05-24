import { makeLogin } from "@/main/factories/pages/login/login-factory";
import { makeSignup } from "@/main/factories/pages/signup/signup-factory";
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
    element: makeSignup()
  }
]);
