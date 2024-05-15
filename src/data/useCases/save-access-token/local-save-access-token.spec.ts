import { faker } from "@faker-js/faker/locale/pt_BR";
import { LocalSaveAccessToken } from "./local-save-access-token";
import { SetStorageSpy } from "@/data/test/mock-storage";

interface SutTypes {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalSaveAccessToken(setStorageSpy);

  return {
    sut,
    setStorageSpy
  };
};

describe("LocalSaveAccessToken", () => {
  test("should call SetStorage with correct value", async () => {
    const { sut, setStorageSpy } = makeSut();
    const uuid = faker.string.uuid();
    await sut.save(uuid);

    expect(setStorageSpy.key).toBe("accessToken");
    expect(setStorageSpy.value).toBe(uuid);
  });

  test("should throw if SetStorage throws", async () => {
    const { sut, setStorageSpy } = makeSut();
    jest.spyOn(setStorageSpy, "set").mockRejectedValueOnce(new Error());

    const promise = sut.save(faker.string.uuid());

    await expect(promise).rejects.toThrow(new Error());
  });
});
