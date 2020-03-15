import _ from "lodash";
import { generateLineChart } from "../src/index";
import { Market } from "@mpoteat/sim-market-data/src/index";
import { sleep } from "@mpoteat/gen-market-common-util/src/index";

const market = Market();

const prices = _.times(1000, () => {
  const result = market.getPrices();
  market.step();
  return result;
}).map(x => x["A"]);

test("Can plot simulated price data", async () => {
  generateLineChart(prices, "./output/testChart", {
    name: 'Simulated Price for Ticker "A"'
  });

  await sleep(1000);
});
