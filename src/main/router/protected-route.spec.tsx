import React from "react";
import { type AccountModel } from "@/domain/models";
import { ApiContext } from "@/presentation/context/api/api-context";
import { render, type RenderResult } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";

interface SutTypes {

  sut: RenderResult
  saveCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (): SutTypes => {
  const saveCurrentAccountMock = jest.fn();
  const getCurrentAccountMock = jest.fn();
  const routes = [
    {

      element: <ProtectedRoute />,
      children: [
        {
          path: "/surveys",
          element: <>
	<div>SurveyList</div>

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
    sut,
    saveCurrentAccountMock
  };
};

describe("ProtectedRoute", () => {
  test("should redirect to /login if token is empty", () => {
    const { sut } = makeSut();
    expect(sut.getByTestId("login")).toBeTruthy();
  });
});
