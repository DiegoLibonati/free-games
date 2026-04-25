import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import InputForm from "@/components/InputForm/InputForm";

interface RenderOptions {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  name?: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const mockOnChange = jest.fn();

const renderComponent = ({
  type = "text",
  placeholder = "Enter value",
  value = "",
  name = "testInput",
  className = "",
  onChange = mockOnChange,
}: RenderOptions = {}): RenderResult =>
  render(
    <InputForm
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      className={className}
      onChange={onChange}
    />
  );

describe("InputForm", () => {
  describe("rendering", () => {
    it("should render the input element", () => {
      renderComponent();
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render with the correct placeholder", () => {
      renderComponent({ placeholder: "Enter your email" });
      expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    });

    it("should render with the correct value", () => {
      renderComponent({ value: "hello@test.com" });
      expect(screen.getByRole("textbox")).toHaveValue("hello@test.com");
    });

    it("should render with the correct name attribute", () => {
      renderComponent({ name: "email" });
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "email");
    });

    it("should render with the correct type attribute", () => {
      renderComponent({ type: "email" });
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
    });

    it("should render with the provided className", () => {
      renderComponent({ className: "my-input" });
      expect(screen.getByRole("textbox")).toHaveClass("my-input");
    });
  });

  describe("behavior", () => {
    it("should call onChange when the user types", async () => {
      const mockHandler = jest.fn();
      const user = userEvent.setup();
      render(
        <InputForm
          type="text"
          placeholder="Type here"
          value=""
          name="field"
          onChange={mockHandler}
        />
      );
      await user.type(screen.getByRole("textbox"), "a");
      expect(mockHandler).toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("should render a password input without the textbox role", () => {
      const { container } = render(
        <InputForm
          type="password"
          placeholder="Password"
          value=""
          name="password"
          onChange={mockOnChange}
        />
      );
      const input = container.querySelector<HTMLInputElement>("input[type='password']");
      expect(input).toBeInTheDocument();
    });

    it("should render with an empty value", () => {
      renderComponent({ value: "" });
      expect(screen.getByRole("textbox")).toHaveValue("");
    });
  });
});
