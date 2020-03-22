# gen-market-project

A fun personal code project to explore simulated TA-strategies in various market models, e.g. Gaussian random walks, as well as biased Gaussian models and reversion-to-mean price models.  It only investigates simple buy/sell actions on pure commodities, not more exotic options.

The project is all in Typescript, a monorepo with full linting and testing.

## Type Structure

The type of a `Strategy` in this project is:

```ts
type Strategy = (
  priceHistory: Record<string, number>[],
  actionHistory: Action[][],
  cash: number,
  assets: Record<string, number>
) => Action[];
```

A `Strategy` is a pure function that has access to the price history on all underlying commodities, a vector of actions it has taken through time, the current amount of cash on hand, and its currently owned assets.  The output is an array of `Actions` to execute.

An `Action` is of type either `BUY` or `SELL`, with a corresponding amount and asset ticker.

In real-life, you can imagine a strategy could be based on more things: It's past ownership of assets, the current order book or order book history, volume history of each asset, or even fundamental data of the underlying commodity. However, that's out-of-scope for this project.

## License

```
MIT License

Copyright (c) 2020 Michael Poteat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
