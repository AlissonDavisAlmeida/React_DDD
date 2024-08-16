import { Login } from "@/presentation/pages/login";
import { type ReactElement } from "react";
import { makeRemoteAuthentication } from "@/main/factories/usecases/authentication/remote-authentication-factory";
import { makeLoginValidatorFactory } from "./login-validator-factory";

export const makeLogin = (): ReactElement => {
  const remoteAuthentication = makeRemoteAuthentication();
  const validationComposite = makeLoginValidatorFactory();
  return <Login
	validation={validationComposite}
	authentication={remoteAuthentication}
         />;
};
