import { render, fireEvent, screen } from "@testing-library/react";
import ProductDetails from "./ProductDetails";

describe("ProductDetails Component", () => {
  test("renders the component without crashing", () => {
    const { container } = render(<ProductDetails />);
    let inputElements = container.querySelectorAll("input");
    expect(inputElements.length).toBe(3); 
    expect(screen.getByText("Product Details")).toBeInTheDocument();
  });

  
  test("should initialize with an empty product name field", () => {
    render(<ProductDetails />);
    let productNameInput = screen.getByLabelText("Product Name");
    expect(productNameInput).toHaveValue("");
  });


  test("should update the product name field value", () => {
    render(<ProductDetails />);
    let productNameInput = screen.getByLabelText("Product Name");
    fireEvent.change(productNameInput, { target: { value: "Sample Product" } });
    expect(productNameInput).toHaveValue("Sample Product");
  });


  test("should compute total amount correctly with valid inputs", () => {
    render(<ProductDetails />);
    fireEvent.change(screen.getByLabelText("Price"), { target: { value: "15.5" } });
    fireEvent.change(screen.getByLabelText("Quantity"), { target: { value: "4" } });
    fireEvent.click(screen.getByText("Calculate Total Amount"));
    expect(screen.getByText("Total Amount: $62.00")).toBeInTheDocument();
  });


  test("should not calculate total amount for invalid inputs", () => {
    render(<ProductDetails />);
    fireEvent.change(screen.getByLabelText("Price"), { target: { value: "abc" } });
    fireEvent.change(screen.getByLabelText("Quantity"), { target: { value: "2" } });
    fireEvent.click(screen.getByText("Calculate Total Amount"));
    let totalAmountDisplay = screen.queryByTestId("totalAmount");
    expect(totalAmountDisplay).not.toBeInTheDocument();
  });
});
