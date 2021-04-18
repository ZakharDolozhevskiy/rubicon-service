export const PRICE_CHANGE_EVENT = 'price.change'

export interface IPriceChangeEvent {
  provider: string,
  price: number,
  pair: string
}