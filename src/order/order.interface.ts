export interface IMarketOrder {
  symbol: string
  side: 'sell' | 'buy'
  type: 'market' | 'limit'
  amount: number
  price?: number
}
export interface IOrder extends IMarketOrder {
  target: number
  provider: string
}

export interface IOrderRange extends IOrder {
  priceFrom: number
  priceTo: number
}