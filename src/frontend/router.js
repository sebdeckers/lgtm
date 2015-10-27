/* global location */
import { on } from 'bubbly'
import uriTemplates from 'uri-templates'

export default class Router {
  constructor (base = location.origin) {
    this.base = base
    this.routes = new Map()
    window::on('popstate', event => this.trigger())
  }

  route (pattern, handler) {
    const template = uriTemplates(pattern)
    const predicate = template.fromUri
    this.routes.set(predicate, handler)
    return this
  }

  trigger () {
    const path = location.pathname + location.search + location.hash
    for (const [predicate, handler] of this.routes.entries()) {
      const params = predicate(path)
      if (params) {
        handler(params)
        break
      }
    }
  }
}
