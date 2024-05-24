import { type ReactElement } from "react";
import { makeSignupValidatorFactory } from "./signup-validator-factory";
import { Signup } from "@/presentation/pages/signup";
import { makeRemoteAddAccount } from "../../usecases/add-account/add-account-factory";

export const makeSignup = (): ReactElement => {
  const remoteAddAccount = makeRemoteAddAccount();
  const validationComposite = makeSignupValidatorFactory();
  return <Signup
	validation={validationComposite}
	addAccount={remoteAddAccount}
         />;
};
