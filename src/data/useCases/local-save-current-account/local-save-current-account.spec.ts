import { faker } from "@faker-js/faker/locale/pt_BR";
import { SetStorageMock } from "@/data/test";
import { LocalSaveCurrentAccount } from "./local-save-current-account";

interface SutTypes {
  sut: LocalSaveCurrentAccount
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveCurrentAccount(setStorageMock);

  return {
    sut,
    setStorageMock
  };
};

describe("LocalSaveAccessToken", () => {
  test("should call SetStorage with correct value", async () => {
    const { sut, setStorageMock } = makeSut();
    const uuid = faker.string.uuid();
    const accountModel = { token: uuid, name: faker.person.firstName() };
    await sut.save(accountModel);

    expect(setStorageMock.key).toBe("accountModel");
    expect(setStorageMock.value).toEqual(JSON.stringify(accountModel));
  });

  test("should throw if SetStorage throws", async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, "set").mockRejectedValueOnce(new Error());

    const promise = sut.save({ token: faker.string.uuid(), name: faker.person.firstName() });

    await expect(promise).rejects.toThrow(new Error());
  });
});
