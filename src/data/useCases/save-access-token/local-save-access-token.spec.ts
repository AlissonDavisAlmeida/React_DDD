import { faker } from "@faker-js/faker/locale/pt_BR";
import { LocalSaveAccessToken } from "./local-save-access-token";
import { SetStorageMock } from "@/data/test/mock-storage";

interface SutTypes {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);

  return {
    sut,
    setStorageMock
  };
};

describe("LocalSaveAccessToken", () => {
  test("should call SetStorage with correct value", async () => {
    const { sut, setStorageMock } = makeSut();
    const uuid = faker.string.uuid();
    await sut.save(uuid);

    expect(setStorageMock.key).toBe("accessToken");
    expect(setStorageMock.value).toBe(uuid);
  });

  test("should throw if SetStorage throws", async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, "set").mockRejectedValueOnce(new Error());

    const promise = sut.save(faker.string.uuid());

    await expect(promise).rejects.toThrow(new Error());
  });
});
