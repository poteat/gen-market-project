import _ from "lodash";
import { gaussian } from "../src/random";

test("Gaussian returns reasonable range", () => {
  const gaussianSamples = _.times(100, gaussian);
  expect(_.every(gaussianSamples, x => x > -10 && x < 10)).toBe(true);
});
