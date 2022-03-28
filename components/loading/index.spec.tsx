import { render } from "@testing-library/react";
import { Loading } from "./Loading";

describe("Loading", () => {
  it("should render default loading spinner", () => {
    const { container } = render(<Loading />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

export {};
