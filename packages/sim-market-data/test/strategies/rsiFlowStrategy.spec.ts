import { StrategyRunner } from "../../src/strategyRunner";
import { rsiFlowStrategy } from "../../src/strategies/rsiFlowStrategy";
import _ from "lodash";
import { generateLineChart } from "@mpoteat/plot-market-data/src";
import { sleep } from "@mpoteat/gen-market-common-util";

test("Can run rsiFlowStrategy on simulated market", async () => {
  const report = StrategyRunner(rsiFlowStrategy, 1000);

  const priceOfAssets = _(report.assetHistory)
    .map((frame, tick) =>
      _.sum(_.map(frame, (x, ticker) => x * report.priceHistory[tick][ticker]))
    )
    .value();

  const totalValueOverTime = priceOfAssets.map(
    (x, i) => x + report.cashHistory[i]
  );

  generateLineChart(totalValueOverTime, "./output/rsiFlowStrategy_totalValue", {
    name: "Total Value [rsiFlowStrategy] over Time"
  });

  await sleep(1000);
});
