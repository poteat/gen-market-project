import _ from "lodash";
import { uniform, gaussian } from "@mpoteat/gen-market-common-util/src/random";

const tickers = ["A", "B", "C", "D", "E"];

/** A market is composed of tickers, whose price are initialized at random
 * values. After each tick, each ticker undergoes a random percentage price
 * change according to the standard normal distribution.
 */
export const Market = () => {
  let tick = 0;

  const tickerPrices = _(tickers)
    .mapKeys()
    .mapValues(() => uniform(10, 1000))
    .value();

  return {
    step: () => {
      tick += 1;
      _.forEach(tickerPrices, (x, key) => {
        tickerPrices[key] = x * (1 + gaussian() / 100);
      });
    },
    getPrices: () => {
      return _.cloneDeep(tickerPrices);
    },
    getCurrentTick: () => {
      return tick;
    }
  };
};
