import { Market } from ".";
import _ from "lodash";

type BuyAction = {
  type: "BUY";
  amount: number;
  ticker: string;
};

type SellAction = {
  type: "SELL";
  amount: number;
  ticker: string;
};

export type Action = BuyAction | SellAction;

export type Strategy = (
  priceHistory: Record<string, number>[],
  actionHistory: Action[][],
  cash: number,
  assets: Record<string, number>
) => Action[];

type StrategyReport = {
  priceHistory: Record<string, number>[];
  actionHistory: Action[][];
  cashHistory: number[];
  assetHistory: Record<string, number>[];
};

export const StrategyRunner = (
  strategy: Strategy,
  n: number
): StrategyReport => {
  const market = Market();

  let cash = 1000;

  const assets = _(market.getPrices())
    .mapValues(() => 0)
    .value();

  const priceHistory: Record<string, number>[] = [];
  const actionHistory: Action[][] = [];
  const cashHistory: number[] = [];
  const assetHistory: Record<string, number>[] = [];

  _.times(n).forEach(() => {
    const prices = market.getPrices();
    priceHistory.push(prices);
    cashHistory.push(cash);

    assetHistory.push({ ...assets });

    const actions = strategy(priceHistory, actionHistory, cash, assets);

    const filteredActions: Action[] = [];

    actions.forEach(action => {
      if (prices[action.ticker] === undefined) {
        console.warn("Strategy tried to use non-existent ticker.");
        return;
      }

      if (action.amount <= 0) {
        console.warn("Strategy tried to specify non-positive amount.");
        return;
      }

      if (action.type === "BUY") {
        let cost = action.amount * prices[action.ticker];

        if (cost > cash) {
          console.warn("Strategy tried to buy more than it had cash for.");

          action.amount = cash / prices[action.ticker];
          cost = cash;
        }

        cash -= cost;
        assets[action.ticker] += action.amount;
      } else if (action.type === "SELL") {
        if (action.amount > assets[action.ticker]) {
          console.warn("Strategy tried to sell more assets than it owns.");

          action.amount = assets[action.ticker];
        }

        cash += action.amount * prices[action.ticker];
        assets[action.ticker] -= action.amount;
      }

      filteredActions.push(action);
    });

    actionHistory.push(filteredActions);

    market.step();
  });

  return {
    priceHistory,
    actionHistory,
    cashHistory,
    assetHistory
  };
};
