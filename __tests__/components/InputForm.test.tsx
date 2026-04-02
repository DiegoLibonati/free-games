import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { InputFormProps } from "@/types/props";

import InputForm from "@/components/InputForm/InputForm";

type RenderComponent = {
  container: HTMLElement;
  props: InputFormProps;
};

const renderComponent = (overrides?: Partial<InputFormProps>): RenderComponent => {
  const onChange = jest.fn();

  const props: InputFormProps = {
    type: "text",
    placeholder: "Enter value",
    value: "",
    name: "test-input",
    onChange,
    ...overrides,
  };

  const { container } = render(<InputForm {...props} />);

  return { container, props };
};

describe("InputForm", () => {
  it("should render an input element", () => {
    renderComponent();

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should render with the correct type", () => {
    renderComponent({ type: "email" });

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
  });

  it("should render with the correct placeholder", () => {
    renderComponent({ placeholder: "Your email" });

    expect(screen.getByPlaceholderText("Your email")).toBeInTheDocument();
  });

  it("should render with the correct name attribute", () => {
    renderComponent({ name: "email" });

    expect(screen.getByRole("textbox")).toHaveAttribute("name", "email");
  });

  it("should render with the correct value", () => {
    renderComponent({ value: "hello@test.com" });

    expect(screen.getByRole("textbox")).toHaveValue("hello@test.com");
  });

  it("should apply the className when provided", () => {
    renderComponent({ className: "my-input" });

    expect(screen.getByRole("textbox")).toHaveClass("my-input");
  });

  it("should call onChange when user types", async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();

    renderComponent({ onChange });

    await user.type(screen.getByRole("textbox"), "a");

    expect(onChange).toHaveBeenCalled();
  });
});
