import { getHistoricalBalance } from "../../src/services/getHistoricalBalances";

describe("getHistoricalBalance", () => {
  it("should return a result",async () => {
    let balance = new Date("2022-06-30T23:59:59.577Z");
    let yesterday = new Date(balance.getDate() -1)
    const res = await getHistoricalBalance(yesterday, balance);
    expect(res.length).greaterThan(0);
  });
});

describe("getHistoricalBalance", () => {
  it("should return an error if from is later than to", async () => {
    let from = new Date();
    let to = new Date(from.getDate() + 1);
    try {
      const res = await getHistoricalBalance(to, from);
    } catch (error) {
      expect(error).toThrow(new Error("from cannot be greater than to"));
    }
  });
});
