import { RemoteAuthentication } from "@/data/useCases/authentication/remote-authentication";
import { makeAxiosHttpClient } from "@/main/factories/http/axios-http-client-factory";
import { type Authentication } from "@/domain/usecases";
import { makeUrl } from "../../http/api-url-factory";

export const makeRemoteAuthentication = (): Authentication => {
  const url = makeUrl();
  const axiosHttpClient = makeAxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);

  return remoteAuthentication;
};
