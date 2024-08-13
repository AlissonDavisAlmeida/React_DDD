import { type AuthenticationParams } from "@/domain/usecases";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { randomUUID } from "crypto";
import { type AccountModel } from "../models";

export const mockAuthentication = (): AuthenticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
};

export const mockAccountModel = (): AccountModel => {
  return {
    token: randomUUID(),
    name: faker.person.firstName()
  };
};
