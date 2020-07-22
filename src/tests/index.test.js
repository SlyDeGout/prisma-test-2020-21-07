const checkAge = require("../index");

//global.fetch = jest.fn(() => Promise.resolve(dataNOK));

describe("checkAge function", () => {
  test("It should return false if age is not in range", () => {
    expect(checkAge(20, [25, 45])).toBe(false);
  });
  test("It should return true if age is in range", () => {
    expect(checkAge(27, [25, 45])).toBe(true);
  });
});
