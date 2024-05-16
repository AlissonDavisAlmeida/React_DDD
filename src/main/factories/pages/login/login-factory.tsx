import { Login } from "@/presentation/pages/login";
import { type ReactElement } from "react";
import { makeRemoteAuthentication } from "@/main/factories/usecases/authentication/remote-authentication-factory";
import { makeLoginValidatorFactory } from "./login-validator-factory";
import { makeSaveAccessToken } from "@/main/factories/usecases/save-access-token/local-save-access-token-factory";

export const makeLogin = (): ReactElement => {
  const remoteAuthentication = makeRemoteAuthentication();
  const validationComposite = makeLoginValidatorFactory();
  const saveAccessToken = makeSaveAccessToken();
  return <Login
	validation={validationComposite}
	authentication={remoteAuthentication}
	saveAccessToken={saveAccessToken}
         />;
};
