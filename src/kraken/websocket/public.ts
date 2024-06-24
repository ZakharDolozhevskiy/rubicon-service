const WebSocket = require('ws')

export enum Events {
  trade = 'trade',
  spread = 'spread',
  ticker = 'ticker',
  book = 'book'
}

export class KrakenPublicSocket {
  private socket: any
  private socketAuth: any

  private readonly URL_DEV = 'wss://beta-ws.kraken.com'
  private readonly URL_PROD = 'wss://ws.kraken.com'

  private readonly URL_DEV_AUTH = 'wss://beta-ws-auth.kraken.com'
  private readonly URL_PROD_AUTH = 'wss://ws-auth.kraken.com'

  // for all event types refer to: https://docs.kraken.com/websockets/#message-subscribe
  private handlers = {
    [Events.trade]: [],
    [Events.spread]: [],
    [Events.ticker]: [],
    [Events.book]: []
  }

  private isOpen: any

  constructor(private pairs: Array<String>) {
    this.socket = new WebSocket(this.URL_DEV)
    this.socket.on('error', this.onError.bind(this))
    this.socket.on('close', this.onClose.bind(this))
    this.socket.on('message', this.onMessage.bind(this))
    this.isOpen = new Promise((resolve) => this.socket.on('open', resolve))
  }

  private onMessage(message, ...rest) {
    let payload = null

    try {
      payload = JSON.parse(message)
    } catch (error) {
      console.error('Failed to parse message payload')
    }

    if (Array.isArray(payload)) {
      let event = payload[payload.length - 2]
      let handlers = this.handlers[event] || []
      handlers.forEach((handler) => handler(payload))
    }
  }

  private onError(error) {
    console.error(error)
  }

  private onClose(event) {
    console.info(event)
  }

  private subscription(options, pairs) {
    this.socket.send(JSON.stringify({ event: 'subscribe', pair: pairs, subscription: options }))
  }

  public subscribe(eventHandlers) {
    this.isOpen.then(() =>
      Object.entries(eventHandlers).forEach(([event, handler]: [Events, (e: any) => void]) => {
        this.handlers[event] && this.handlers[event].push(handler)
        this.handlers[event].length === 1 && this.subscription({ name: event }, this.pairs)
      })
    )
  }
}
