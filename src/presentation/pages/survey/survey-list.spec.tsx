import { SurveyList } from ".";
import { type RenderResult, render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { type ValidationSpy } from "@/presentation/test/mock-validation";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { Routes, Route, MemoryRouter, useLocation } from "react-router-dom";
import { UnexpectedError } from "@/domain/errors";

interface SutTypes {

  sut: RenderResult

}

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid='location-display'>{location.pathname}</div>;
};

const nameFake = faker.person.firstName();
const emailFake = faker.internet.email();
const passwordFake = faker.internet.password();

const makeSut = (): SutTypes => {
  const errorMessage = faker.word.words();

  const sut = render(<>
	<MemoryRouter
		initialEntries={["/signup", "/"]}
		initialIndex={0}
	>
		<Routes>
			<Route
				path='/'
				element={<div data-testid='home-page'>home</div>}
			/>

			<Route
				path='/login'
				element={<div data-testid='login-page'>login</div>}
			/>

			<Route
				path='/survey'

				element={<SurveyList />}
			/>
		</Routes>

		<LocationDisplay />
	</MemoryRouter>

  </>

  );

  return {
    sut
  };
};

const fillFields = (sut: RenderResult, validationSpy: ValidationSpy): void => {
  validationSpy.errorMessage = "";
  const nameInput = sut.getByTestId("name");
  fireEvent.input(nameInput, { target: { value: nameFake } });

  const emailInput = sut.getByTestId("email");
  fireEvent.input(emailInput, { target: { value: emailFake } });

  const passwordInput = sut.getByTestId("password");
  fireEvent.input(passwordInput, { target: { value: passwordFake } });

  const passwordConfirmationInput = sut.getByTestId("passwordConfirmation");
  fireEvent.input(passwordConfirmationInput, { target: { value: passwordFake } });
};

describe("Signup Component", () => {
  const user = userEvent.setup();

  afterEach(cleanup);

  test("should start with initial state", async () => {
    const { sut } = makeSut();

    const errorWrap = await sut.findByTestId("error-wrap");
    const submitButton = await sut.findByTestId("submit") as HTMLButtonElement;

    expect(errorWrap.childElementCount).toBe(0);
    expect(submitButton.disabled).toBeTruthy();
  });

  test("should inputValue starts with empty string", async () => {
    const { sut } = makeSut();
  });

  test("should show emailError if validation fails", () => {
    const { sut } = makeSut();

    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: emailFake } });
  });
  test("should show passwordError if validation fails", () => {
    const { sut } = makeSut();

    const emailInput = sut.getByTestId("password");
    fireEvent.input(emailInput, { target: { value: passwordFake } });
  });

  test("should show valid email state if validation succeeds", () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: emailFake } });

    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe("Tudo certo!");
    expect(emailStatus.textContent).toBe("🟢");
  });
  test("should show valid password state if validation succeeds", () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: passwordFake } });

    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe("Tudo certo!");
    expect(passwordStatus.textContent).toBe("🟢");
  });

  test("should enable submit button if form is valid", () => {
    const { sut } = makeSut();
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  test("should show spinner on submit", async () => {
    const { sut } = makeSut();
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    fireEvent.click(submitButton);

    await waitFor(() => sut.getByTestId("spinner"));
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  test("should call AddAccount with correct values", async () => {
    const { sut } = makeSut();
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    await userEvent.click(submitButton);
  });

  test("should call AddAccount only once", async () => {
    const { sut } = makeSut();
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    await userEvent.click(submitButton);
    await userEvent.click(submitButton);
  });

  test("should not call AddAccount if form is invalid", () => {
    const { sut } = makeSut();
    const form = sut.getByTestId("form") as HTMLButtonElement;
    fireEvent.submit(form);
  });

  test("should present error if AddAccount fails", async () => {
    const { sut } = makeSut();
    const error = new UnexpectedError();

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    fireEvent.click(submitButton);

    await waitFor(() => sut.getByTestId("error-wrap"));

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(1);

    const mainError = sut.getByTestId("main-error");
    expect(mainError.textContent).toBe(error.message);
  });

  test("should go to login page", async () => {
    const { sut } = makeSut();

    const signup = sut.getByText(/Fazer login/i);
    await user.click(signup);

    expect(sut.getByTestId("login-page")).toBeTruthy();
    expect(sut.getByTestId("location-display").textContent).toBe("/login");
  });

  test("should present error if SaveAccessToken fails", async () => {
    const { sut } = makeSut();
  });

  test("should call SaveAccessToken on success", async () => {
    const { sut } = makeSut();

    expect(sut.getByTestId("location-display").textContent).toBe("/");
  });
});
