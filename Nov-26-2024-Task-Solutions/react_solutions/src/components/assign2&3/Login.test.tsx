import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login Component", () => {
    test("renders render component without crashing", () => {
        const { container } = render(<Login />);
        let inputElements = container.querySelectorAll("input");
        expect(inputElements.length).toBe(2); 
    });


    test("should user id textbox value is empty", () => {
        const { container } = render(<Login />);
        let textElement = container.querySelector<HTMLInputElement>("#t1");
        expect(textElement?.value).toBe("");
    });


    test("should set the correct value to textbox", () => {
        const { container } = render(<Login />);
        let textElement = container.querySelector<HTMLInputElement>("#t1");
        fireEvent.change(textElement!,  {  target : {  value : "Narasimha" }   });
        expect(textElement?.value).toBe("Narasimha");
    });


    test("should display valid result message for correct credentials", () => {
        const { container } = render(<Login />);

        let uidElement:HTMLInputElement | null = container.querySelector<HTMLInputElement>("#t1");
        let pwdElement:HTMLInputElement | null = container.querySelector<HTMLInputElement>("#t2");
        let loginButton:HTMLInputElement | null = container.querySelector<HTMLInputElement>("#b1");

        fireEvent.change(uidElement!,  {  target : {  value : "admin" }   });
        fireEvent.change(pwdElement!,  {  target : {  value : "admin123" }   });
        fireEvent.click(loginButton!);

        expect(screen.getByText('Welcome to Admin')).toBeInTheDocument();
    });

  

    test("should display invalid message for wrong credentials", () => {
        const { container } = render(<Login />);

        let uidElement:HTMLInputElement | null = container.querySelector<HTMLInputElement>("#t1");
        let pwdElement:HTMLInputElement | null = container.querySelector<HTMLInputElement>("#t2");
        let loginButton:HTMLInputElement | null = container.querySelector<HTMLInputElement>("#b1");

        fireEvent.change(uidElement!,  {  target : {  value : "hello" }   });
        fireEvent.change(pwdElement!,  {  target : {  value : "admin123" }   });
        fireEvent.click(loginButton!);

    
        const resultElement = screen.getByText("Invalid User Id or Password");
        expect(resultElement).toBeInTheDocument();
    });


    test("should display error when user ID is not supplied", () => {
        const { container } = render(<Login />);

        let loginButton:HTMLInputElement | null = container.querySelector<HTMLInputElement>("#b1");
        fireEvent.click(loginButton!);

        const uidErrorElement = screen.getByText('User ID is required');
        expect(uidErrorElement).toBeInTheDocument();
    });

    test("should display error when password is not supplied", () => {
        const { container } = render(<Login />);

        let uidElement:HTMLInputElement | null = container.querySelector<HTMLInputElement>("#t1");
        let loginButton:HTMLInputElement | null = container.querySelector<HTMLInputElement>("#b1");

        fireEvent.change(uidElement!, { target: { value: "admin" } });
        fireEvent.click(loginButton!);

        const pwdErrorElement = screen.getByText('Password is required');
        expect(pwdErrorElement).toBeInTheDocument();
    });

  
    test("should have SignUp link", () => {
        render(<Login />);
    
        const signupLink = screen.getByRole('link', { name: /Sign Up/i });
        expect(signupLink).toBeInTheDocument();
        expect(signupLink).toHaveAttribute('href', '#');
    });

    test("should handle SignUp link click", () => {
        render(<Login />)
        const originalAlert = window.alert;
        window.alert = () => {};

        const signupLink = screen.getByText(/Sign Up/i);
        fireEvent.click(signupLink);

        window.alert = originalAlert;
    });
});