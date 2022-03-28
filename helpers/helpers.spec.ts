import { parseDate } from "./index";

describe("helpers", () => {
  it("should parse date ", () => {
    const stringDate = "04/07/2001";
    const date = parseDate(stringDate);

    expect(date).toBeInstanceOf(Date);
  });
});

export {};
