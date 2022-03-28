import { render } from "@testing-library/react";
import { PasswordInput } from ".";

describe("PasswordInput", () => {
  it("should render default", () => {
    const { container } = render(
      <PasswordInput
        placeholder="senha"
        register={() => null}
        isInvalid={false}
        isRequired
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

export {};
