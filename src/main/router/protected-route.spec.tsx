import React from "react";
import { ApiContext } from "@/presentation/context/api/api-context";
import { render, type RenderResult } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { mockAccountModel } from "@/domain/test";

interface SutTypes {

  sut: RenderResult
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const saveCurrentAccountMock = jest.fn();
  const getCurrentAccountMock = () => account;
  const routes = [
    {

      element: <ProtectedRoute />,
      children: [
        {
          path: "/surveys",
          element: <>
	<div data-testid="survey-list">SurveyList</div>

                    </>
        }
      ]
    },
    {
      path: "/login",
      element: <>
	<div data-testid="login">Login</div>

	{" "}

            </>
    }
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/surveys"],
    initialIndex: 0
  }
  );
  const sut = render(<ApiContext.Provider value={{ setCurrentAccount: saveCurrentAccountMock, getCurrentAccount: getCurrentAccountMock }}>
	<RouterProvider router={router} />

    </ApiContext.Provider>);

  return {
    sut
  };
};

describe("ProtectedRoute", () => {
  test("should redirect to /login if token is empty", () => {
    const { sut } = makeSut(null as any);
    expect(sut.getByTestId("login")).toBeTruthy();
  });

  test("should render current component if token is not empty", () => {
    const { sut } = makeSut();

    expect(sut.getByTestId("survey-list")).toBeTruthy();
  });
});
