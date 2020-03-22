import _ from "lodash";
import { Market } from "../src/index";
import { generateLineChart } from "@mpoteat/plot-market-data";
import { sleep } from "@mpoteat/gen-market-common-util";

test("Market can run for 100 ticks", async () => {
  const market = Market();

  const prices = _.times(100, () => {
    const result = market.getPrices();
    market.step();
    return result;
  });

  expect(prices.length).toBe(100);

  generateLineChart(
    prices.map(x => x.A),
    "./output/market_a_ticker_price",
    {
      name: "'A' Price over Time"
    }
  );

  await sleep(500);
});
