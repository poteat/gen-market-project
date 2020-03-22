import _ from "lodash";
import { generateLineChart } from "../src/index";
import { Market } from "@mpoteat/sim-market-data/src/index";
import { sleep, ssma, rsi } from "@mpoteat/gen-market-common-util";

console.log = jest.fn();

const market = Market();

const prices = _.times(100, () => {
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

test("Can plot SSMA of simulated price data", async () => {
  const ssmaResult = ssma(prices, 14);

  generateLineChart(ssmaResult, "./output/testChart_ssma", {
    name: 'SSMA of Ticker "A"'
  });

  await sleep(1000);
});

test("Can plot RSI of simulated price data", async () => {
  const ssmaResult = rsi(prices, 14);

  generateLineChart(ssmaResult, "./output/testChart_rsi", {
    name: 'RSI of Ticker "A"'
  });

  await sleep(1000);
});
