import Router from './router'

export default class extends Router {
  constructor (routes = new Map(), ...args) {
    for (const [pattern, handler] of new Map(routes).entries()) {
      console.log(pattern, handler)
      // TODO Wrap the handler with asynchronous transition management.
    }
    super(routes, ...args)
  }
}
