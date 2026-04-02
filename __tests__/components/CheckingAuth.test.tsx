import { render } from "@testing-library/react";

import CheckingAuth from "@/components/CheckingAuth/CheckingAuth";

const renderComponent = () => {
  const { container } = render(<CheckingAuth />);
  return { container };
};

describe("CheckingAuth", () => {
  it("should render the loader wrapper", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLDivElement>(".loader-wrapper")).toBeInTheDocument();
  });

  it("should render the auth spinner inside the wrapper", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLDivElement>(".loader-wrapper__auth")).toBeInTheDocument();
  });
});
