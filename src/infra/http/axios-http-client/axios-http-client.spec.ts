import { AxiosHttpClient } from "./axios-http-client";
import { type MockAxios, mockAxios } from "@/infra/test";
import { mockPostRequest } from "@/data/test";

jest.mock("axios");

interface MakeSut {
  sut: AxiosHttpClient
  mockedAxios: MockAxios
}

const makeSut = (): MakeSut => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios
  };
};

describe("Axios Http Client", () => {
  describe("Post", () => {
    test("should call axios with correct values", async () => {
      const { url, body } = mockPostRequest();
      const { sut, mockedAxios: { mockedAxios } } = makeSut();
      await sut.post({ url, body });

      expect(mockedAxios.post).toHaveBeenCalledWith(url, body);
    });
    test("should return correct statusCode and body", async () => {
      const { url, body } = mockPostRequest();
      const { sut, mockedAxios: { mockResolvedValues } } = makeSut();
      const result = await sut.post({ url, body });

      expect(result).toEqual({
        statusCode: mockResolvedValues.status,
        body: mockResolvedValues.data
      });
    });
    test("should return correct statusCode and body on failure", async () => {
      const { url, body } = mockPostRequest();
      const { sut, mockedAxios: { mockResolvedValues, mockedAxios } } = makeSut();

      mockedAxios.post.mockRejectedValueOnce({
        response: {
          status: mockResolvedValues.status,
          data: mockResolvedValues.data
        }
      });

      const result = await sut.post({ url, body });

      expect(result).toEqual({
        statusCode: mockResolvedValues.status,
        body: mockResolvedValues.data
      });
    });
  });

  describe("Get", () => {

  });
});
