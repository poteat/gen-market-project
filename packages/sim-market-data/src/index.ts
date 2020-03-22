import _ from "lodash";
import { uniform, gaussian } from "@mpoteat/gen-market-common-util/src/random";

const tickers = ["A", "B", "C", "D", "E"] as const;

export type PriceHistory = Record<string, number>;

// TODO: See results if we assume if market is positive one tick, the next tick
// has 75% chance to be positive and vice-versa.

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

  const tickerChangeHistory = _(tickers)
    .mapKeys()
    .mapValues((): number[] => [])
    .value();

  return {
    step: () => {
      _.forEach(tickerPrices, (x, key) => {
        let percentageChange = gaussian() / 100;

        const signShouldChange = Math.random() < 0.25;

        if (tick > 0) {
          console.log(
            `Previous change was ${_.last(
              tickerChangeHistory[key]
            )!} and current change is ${percentageChange},`
          );
          if (
            signShouldChange ===
            (Math.sign(_.last(tickerChangeHistory[key])!) ===
              Math.sign(percentageChange))
          ) {
            percentageChange *= -1;
          }
        }

        tickerPrices[key] = x * (1 + percentageChange / 100);

        tickerChangeHistory[key].push(percentageChange);
      });
      tick += 1;
    },
    getPrices: () => {
      return _.cloneDeep(tickerPrices);
    },
    getCurrentTick: () => {
      return tick;
    }
  };
};
