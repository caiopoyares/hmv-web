import { getAuthToken } from "./auth";

const mockedContext = {
  req: {
    headers: {
      _jwt: "teste",
    },
  },
} as any;

describe("auth", () => {
  it("should get auth token", () => {
    document.cookie = "_jwt=teste";

    const token = getAuthToken(mockedContext);

    expect(token).toBe("Bearer teste");
  });

  it("should not return auth token if it doesn't exist", () => {
    document.cookie = "_jwt=";

    const token = getAuthToken(mockedContext);
    expect(token).toBeNull();
  });
});

export {};
