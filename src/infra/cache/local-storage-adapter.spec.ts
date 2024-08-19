import { LocalStorageAdapter } from "./local-storage-adapter";
import "jest-localstorage-mock";
import { mockAccountModel } from "@/domain/test";

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

const fakeAccount = mockAccountModel();

describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should call localStorage.setItem with correct values", async () => {
    const sut = makeSut();
    const value = "{\"value\":\"any_value\"}";
    const valueParsed = JSON.parse(value);
    sut.set("any_key", valueParsed);
    expect(localStorage.setItem).toHaveBeenCalledWith("any_key", value);
  });
  test("should call localStorage.getItem with correct value", async () => {
    const sut = makeSut();
    const value = "account";
    const getItemSpy = jest.spyOn(localStorage, "getItem").mockReturnValueOnce(JSON.stringify(fakeAccount));
    const obj = sut.get(value);
    expect(getItemSpy).toHaveBeenCalledWith(value);
    expect(obj).toEqual(fakeAccount);
  });
});
