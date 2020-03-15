import _ from "lodash";
import { Market } from "../src/index";

test("Market can run for 100 ticks", () => {
  const market = Market();

  const prices = _.times(100, () => {
    const result = market.getPrices();
    market.step();
    return result;
  });

  expect(prices.length).toBe(100);
});
