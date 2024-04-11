import { RemoteAuthentication } from "@/data/useCases/authentication/remote-authentication";
import { AxiosHttpClient } from "@/infra/http/axios-http-client/axios-http-client";
import { Login } from "@/presentation/pages/login";
import { ValidationBuilder } from "@/validation/builder/validation-builder";
import { ValidationComposite } from "@/validation/composite/validation-composite";
import { type ReactElement } from "react";

export const makeLogin = (): ReactElement => {
  const url = "https://react-advanced.wiremockapi.cloud/login";
  const remoteAuthentication = new RemoteAuthentication(url, new AxiosHttpClient());

  const validationComposite = new ValidationComposite([
    ...ValidationBuilder.field("email").required().email().build(),
    ...ValidationBuilder.field("password").required().min(5).build()
  ]);

  return <Login
	validation={validationComposite}
	authentication={remoteAuthentication}
         />;
};
