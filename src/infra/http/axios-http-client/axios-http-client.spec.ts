import { AxiosHttpClient } from "./axios-http-client";
import { type MockAxios, mockAxios } from "@/infra/test";
import { mockGetRequest, mockPostRequest } from "@/data/test";

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
      const { sut, mockedAxios: { mockResolvedPostValues } } = makeSut();
      const result = await sut.post({ url, body });

      expect(result).toEqual({
        statusCode: mockResolvedPostValues.status,
        body: mockResolvedPostValues.data
      });
    });
    test("should return correct statusCode and body on failure", async () => {
      const { url, body } = mockPostRequest();
      const { sut, mockedAxios: { mockResolvedPostValues, mockedAxios } } = makeSut();

      mockedAxios.post.mockRejectedValueOnce({
        response: {
          status: mockResolvedPostValues.status,
          data: mockResolvedPostValues.data
        }
      });

      const result = await sut.post({ url, body });

      expect(result).toEqual({
        statusCode: mockResolvedPostValues.status,
        body: mockResolvedPostValues.data
      });
    });
  });

  describe("Get", () => {
    test("should call axios with correct values", async () => {
      const { url } = mockGetRequest();
      const { sut, mockedAxios: { mockedAxios } } = makeSut();
      await sut.get({ url });

      expect(mockedAxios.get).toHaveBeenCalledWith(url);
    });

    // test("should return correct statusCode and body", async () => {
    //   const { url } = mockGetRequest();
    //   const { sut, mockedAxios: { mockResolvedGetValues } } = makeSut();
    //   const result = await sut.get({ url });

    //   expect(result).toEqual({
    //     statusCode: mockResolvedGetValues.status,
    //     body: mockResolvedGetValues.data
    //   });
    // });
  });
});
