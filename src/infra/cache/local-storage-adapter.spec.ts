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
    await sut.set("any_key", "any_value");
    expect(localStorage.setItem).toHaveBeenCalledWith("any_key", "any_value");
  });
});
