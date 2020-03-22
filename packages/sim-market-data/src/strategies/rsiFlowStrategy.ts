/** Each tick, check all tickers to see if RSI has newly crossed the overbought
 * or oversold levels (30/70). If so, convert 20% of the cash/asset to the
 * opposite.
 */

import { Strategy, Action } from "../strategyRunner";
import { rsi } from "@mpoteat/gen-market-common-util/src";
import _ from "lodash";

export const rsiFlowStrategy: Strategy = (
  priceHistory: Record<string, number>[],
  actionHistory: Action[][],
  cash: number,
  assets: Record<string, number>
) => {
  const invertedPriceHistory = _(assets)
    .mapValues((_x, key) => priceHistory.map(x => x[key]))
    .value();

  const rsiHistory = _(invertedPriceHistory)
    .mapValues(x => rsi(x, 14))
    .value();

  const rsiAlerts =
    priceHistory.length > 0
      ? _(rsiHistory)
          .mapValues(x =>
            x[x.length - 2] > 20 && x[x.length - 1] < 20
              ? "BUY"
              : x[x.length - 2] < 80 && x[x.length - 1] > 80
              ? "SELL"
              : ""
          )
          .pickBy()
          .value()
      : {};

  const alerts: Action[] = _(rsiAlerts)
    .map((action: "BUY" | "SELL", ticker: string) => ({
      type: action,
      ticker,
      amount:
        action === "BUY"
          ? (cash * 0.1) / _.last(priceHistory)![ticker]
          : assets[ticker] * 0.1
    }))
    .filter(x => (x as any).amount > 0)
    .value() as any;

  return alerts;
};
