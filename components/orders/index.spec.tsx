import { OpenOrders } from "./OpenOrders";
import { render } from "@testing-library/react";
import { ClosedOrders } from "./ClosedOrders";
import { Order } from "../../types";

const mockedOpenOrders = [
  {
    id: 4,
    user: {
      id: 1,
      firstName: "john",
      lastName: "doe",
      cpf: 42013234276,
    },
    hospital: {
      name: "Mocked hospital",
    },
    reason: "anything",
    arrivalDate: new Date("14/02/2022"),
  } as unknown as Order,
] as Order[];

describe("Orders", () => {
  it("should render empty open orders", () => {
    const { container } = render(<OpenOrders orders={[]} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render open orders", () => {
    const { container } = render(<OpenOrders orders={mockedOpenOrders} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render empty closed orders", () => {
    const { container } = render(<ClosedOrders orders={[]} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should render open orders", () => {
    const { container } = render(<ClosedOrders orders={mockedOpenOrders} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

export {};
