/* global location */
import { on } from 'bubbly'
import uriTemplates from 'uri-templates'
import { chain } from 'js-deco/dist/commonjs/chain'
import anechoic from './decorators/anechoic'

export default class Router {
  constructor (routes = new Map()) {
    this.routes = routes
    window::on('popstate', event => this.trigger())
  }

  @chain
  route (pattern, handler) {
    const template = uriTemplates(pattern)
    const predicate = template.fromUri
    this.routes.set(predicate, handler)
  }

  @chain
  @anechoic
  trigger (path = location.pathname + location.search + location.hash) {
    for (const [predicate, handler] of this.routes.entries()) {
      const params = predicate(path)
      if (params) {
        handler(params)
        break
      }
    }
  }
}
