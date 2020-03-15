import _ from "lodash";

const output = require("d3node-output");
const d3nLine = require("d3node-linechart");

type ChartConfig = {
  name: string;
  width: number;
  height: number;
};

const defaultConfig: ChartConfig = {
  name: "Line Chart",
  width: 800,
  height: 600
};

export const generateLineChart = async (
  _data: number[],
  path: string,
  _config: Partial<ChartConfig> = {}
) => {
  const config = _.merge(defaultConfig, _config);

  const data: { key: number; value: number }[][] & { allKeys: number[] } = [
    _data
  ].map(x =>
    x.map((value, key) => ({
      key,
      value
    }))
  ) as any;

  data.allKeys = _(_data)
    .keys()
    .map(Number)
    .value();

  await output(
    path,
    d3nLine({
      data: data,
      container: `<div id="container"><h2>${config.name}</h2><div id="chart"></div></div>`,
      lineColors: ["steelblue"],
      width: config.width,
      height: config.height
    })
  );
};
