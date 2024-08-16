import React from "react";
import { type AccountModel } from "@/domain/models";
import { ApiContext } from "@/presentation/context/api/api-context";
import { Outlet } from "react-router-dom";
import { UnexpectedError } from "@/domain/errors";
import { makeLocalStorageAdapter } from "../factories/cache/local-storage-adapter-factory";

const setCurrentAccountAdapter = (account: AccountModel) => {
  if (!account.token) {
    throw new UnexpectedError();
  }
  makeLocalStorageAdapter().set("account", account);
};

export const ProtectedRoute = () => {
  return (
	<ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter }}>

		<Outlet />

	</ApiContext.Provider>
  );
};
