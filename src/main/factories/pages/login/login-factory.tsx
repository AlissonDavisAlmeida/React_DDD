import { Login } from "@/presentation/pages/login";
import { type ReactElement } from "react";
import { makeRemoteAuthentication } from "@/main/factories/usecases/authentication/remote-authentication-factory";
import { makeLoginValidatorFactory } from "./login-validator-factory";
import { makeSaveCurrentAccount } from "@/main/factories/usecases/save-current-account/local-save-current-account-factory";

export const makeLogin = (): ReactElement => {
  const remoteAuthentication = makeRemoteAuthentication();
  const validationComposite = makeLoginValidatorFactory();
  const saveAccessToken = makeSaveCurrentAccount();
  return <Login
	validation={validationComposite}
	authentication={remoteAuthentication}
	saveAccessToken={saveAccessToken}
         />;
};
