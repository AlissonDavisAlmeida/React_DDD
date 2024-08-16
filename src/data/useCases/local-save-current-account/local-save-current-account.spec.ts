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
    sut.save(accountModel);

    expect(setStorageMock.key).toBe("accountModel");
    expect(setStorageMock.value).toEqual(JSON.stringify(accountModel));
  });

  test("should throw if SetStorage throws", async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, "set").mockImplementationOnce(() => { throw new Error(); });

    try {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      sut.save({ token: faker.string.uuid(), name: faker.person.firstName() });
    } catch (e) {
      expect(e).toEqual(new Error());
    }
  });
});
