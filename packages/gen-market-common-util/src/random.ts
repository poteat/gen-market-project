import assert from "assert";
import { default as gaussianConstructor } from "gaussian";

export const uniform = (min: number, max: number) => {
  assert(min < max);
  return Math.random() * (max - min) + min;
};

export const gaussian = () => gaussianConstructor(0, 1).ppf(Math.random());
