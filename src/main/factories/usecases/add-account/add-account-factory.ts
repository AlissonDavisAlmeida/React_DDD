import { makeAxiosHttpClient } from "@/main/factories/http/axios-http-client-factory";
import { type AddAccount } from "@/domain/usecases";
import { makeUrl } from "../../http/api-url-factory";
import { RemoteAddAccountUseCase } from "@/data/useCases/add-account/remote-add-account";

export const makeRemoteAddAccount = (): AddAccount => {
  const url = makeUrl("/signup");
  const axiosHttpClient = makeAxiosHttpClient();
  const remoteAddAccount = new RemoteAddAccountUseCase(url, axiosHttpClient);

  return remoteAddAccount;
};
