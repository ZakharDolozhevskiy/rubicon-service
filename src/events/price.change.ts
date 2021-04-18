export const PRICE_CHANGE_EVENT = 'pair.price.change'

export interface IPriceChangeEvent {
  provider: string,
  price: number,
  pair: string
}