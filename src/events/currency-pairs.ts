export class PairPriceChangeEvent {
  public provider: string
  public price: number
  public pair: string

  constructor({ provider, price, pair }) {
    this.provider = provider
    this.price = price
    this.pair = pair
  }
}
