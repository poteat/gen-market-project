import _ from "lodash";

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const ssma = (x: number[], n: number) => {
  let _s = 0;
  const avg = _(x)
    .map((_x, i) => {
      const r = i === 0 ? _x : ((n - 1) * _s + _x) / n;
      _s = r;
      return r;
    })
    .value();

  return avg;
};

export const rsi = (x: number[], n: number) => {
  const u = ssma(
    _(x)
      .map((_x, i) => (i === 0 ? 0 : _x > x[i - 1] ? _x - x[i - 1] : 0))
      .value(),
    n
  );

  const d = ssma(
    _(x)
      .map((_x, i) => (i === 0 ? 0 : _x < x[i - 1] ? x[i - 1] - _x : 0))
      .value(),
    n
  );

  const rsi = _(x)
    .map((_x, i) => u[i] / d[i])
    .map(x => 100 - 100 / (1 + x))
    .map(x => (Number.isNaN(x) || x === 100 || x === 0 ? 50 : x))
    .value();

  return rsi;
};
