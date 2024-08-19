import { mockAccountModel } from "@/domain/test";
import { setCurrentAccountAdapter } from "./current-account-adapter";
import { LocalStorageAdapter } from "@/infra/cache/local-storage-adapter";
import { UnexpectedError } from "@/domain/errors";

// jest.mock("@/infra/cache/local-storage-adapter");
describe("CurrentAccountAdapter", () => {
  test("should call LocalStorageAdapter with correct values", () => {
    const localStorageSpy = jest.spyOn(LocalStorageAdapter.prototype, "set");
    const account = mockAccountModel();
    setCurrentAccountAdapter(account);

    expect(localStorageSpy).toHaveBeenCalledWith("account", account);
  });

  test("should throw if an invalid account is provided", () => {
    const account = mockAccountModel();
    account.token = "";
    expect(() => { setCurrentAccountAdapter(account); }).toThrow(new UnexpectedError());
  });
});
