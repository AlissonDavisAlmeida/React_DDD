import { LocalStorageAdapter } from "./local-storage-adapter";
import "jest-localstorage-mock";

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

describe("LocalStorageAdapter", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should call localStorage with correct values", async () => {
    const sut = makeSut();
    const value = "{\"value\":\"any_value\"}";
    const valueParsed = JSON.parse(value);
    sut.set("any_key", valueParsed);
    expect(localStorage.setItem).toHaveBeenCalledWith("any_key", value);
  });
});
