export interface IOrder {
  type: string;
  amount: number
  target: number
  provider: string
  currency: string
}

export interface IOrderRange extends IOrder {
  priceFrom: number
  priceTo: number
}