import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { InputFormProps } from "@src/entities/props";

import { InputForm } from "@src/components/InputForm/InputForm";

type RenderComponent = {
  props: { onChange: jest.Mock } & InputFormProps;
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const props = {
    type: "text",
    placeholder: "placeholder",
    value: "",
    name: "username",
    onChange: jest.fn(),
  };

  const { container } = render(
    <InputForm
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
    ></InputForm>
  );

  return {
    props: props,
    container: container,
  };
};

describe("InputForm.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the input.", () => {
      const { props } = renderComponent();

      const input = screen.getByRole("textbox");

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("name", props.name);
      expect(input).toHaveAttribute("placeholder", props.placeholder);
      expect(input).toHaveAttribute("type", props.type);
      expect(input).toHaveValue(props.value);
    });

    test("It must execute the onChange function when you write something to the input.", async () => {
      const inputValue = "H";

      const { props } = renderComponent();

      const input = screen.getByRole("textbox");

      expect(input).toBeInTheDocument();

      await user.clear(input);
      await user.click(input);
      await user.keyboard(inputValue);

      expect(props.onChange).toHaveBeenCalledTimes(1);
    });
  });
});
