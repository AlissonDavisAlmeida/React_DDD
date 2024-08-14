import { makeLogin } from "@/main/factories/pages/login/login-factory";
import { makeSignup } from "@/main/factories/pages/signup/signup-factory";
import { SurveyList } from "@/presentation/pages/survey";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([

  {
    path: "/login",
    element: makeLogin()
  },
  {
    path: "/signup",
    element: makeSignup()
  },
  {
    path: "/",
    element: <SurveyList />
  }
]);
