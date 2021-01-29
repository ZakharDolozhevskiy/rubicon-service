const WebSocket = require('ws')

export class KrakenPublicSocket {
  private socket: any
  private socketAuth: any

  private readonly URL_DEV = 'wss://beta-ws.kraken.com'
  private readonly URL_PROD = 'wss://ws.kraken.com'

  private readonly URL_DEV_AUTH = 'wss://beta-ws-auth.kraken.com'
  private readonly URL_PROD_AUTH = 'wss://ws-auth.kraken.com'

  private listeners = []

  constructor(private pairs: string[], private token?: string) {
    this.socket = new WebSocket(this.URL_DEV)
    this.socket.on('open', this.onOpen.bind(this))
    this.socket.on('error', this.onError.bind(this))
    this.socket.on('close', this.onClose.bind(this))
    this.socket.on('message', this.onMessage.bind(this))
  }

  private onOpen() {
    this.subscribeForPrice('trade')
    //this.subscribeForPrice('spread')
    //this.subscribeForPrice('ticker')
  }

  private subscribeForPrice(method: string) {
    this.socket.send(
      JSON.stringify({
        event: 'subscribe',
        pair: ['ETH/USD'] || this.pairs,
        subscription: { name: method }
      })
    )
  }

  private onMessage(message) {
    let payload = null

    try {
      payload = JSON.parse(message)
    } catch (error) {
      console.error('Failed to parse message payload')
    }

    if (Array.isArray(payload)) {
      this.listeners.forEach((callback) => callback(payload))
    }
  }

  private onError(error) {
    console.error(error)
  }

  private onClose(event) {
    console.info(event)
  }

  public subscribe(event, callback, options) {
    this.listeners.push(callback)
  }
}
