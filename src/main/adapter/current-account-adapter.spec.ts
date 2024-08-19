import { mockAccountModel } from "@/domain/test";
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from "./current-account-adapter";
import { LocalStorageAdapter } from "@/infra/cache/local-storage-adapter";
import { UnexpectedError } from "@/domain/errors";

// jest.mock("@/infra/cache/local-storage-adapter");
const fakeAccount = mockAccountModel();
describe("CurrentAccountAdapter", () => {
  test("should call LocalStorageAdapter.set with correct values", () => {
    const localStorageSpy = jest.spyOn(LocalStorageAdapter.prototype, "set");
    const account = mockAccountModel();
    setCurrentAccountAdapter(account);

    expect(localStorageSpy).toHaveBeenCalledWith("account", account);
  });
  test("should call LocalStorageAdapter.get with correct value", () => {
    const localStorageSpy = jest.spyOn(LocalStorageAdapter.prototype, "get").mockReturnValueOnce(fakeAccount);
    const key = "account";
    const obj = getCurrentAccountAdapter();

    expect(localStorageSpy).toHaveBeenCalledWith(key);
    expect(obj).toEqual(fakeAccount);
  });

  test("should throw if an invalid account is provided", () => {
    const account = mockAccountModel();
    account.token = "";
    expect(() => { setCurrentAccountAdapter(account); }).toThrow(new UnexpectedError());
  });
});
