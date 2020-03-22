import _ from "lodash";
import { ssma, sleep, rsi } from "../src/index";
import { Market } from "@mpoteat/sim-market-data";

test("Can sleep, for a time", async () => {
  await sleep(10);
});

test("Can calculate SSMA on simulated market data", () => {
  const market = Market();

  const prices = _.times(100, () => {
    const price = market.getPrices();
    market.step();
    return price["A"];
  });

  const ssmaResult = ssma(prices, 14);

  expect(ssmaResult.length).toBe(prices.length);
});

test("Can calculate RSI on simulated market data", () => {
  const market = Market();

  const prices = _.times(100, () => {
    const price = market.getPrices();
    market.step();
    return price["A"];
  });

  const rsiResult = rsi(prices, 14);

  console.log(rsiResult);

  expect(rsiResult.length).toBe(prices.length);
});
