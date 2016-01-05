import { on } from 'bubbly'
import uriTemplates from 'uri-templates'
import { chain } from 'js-deco/dist/commonjs/chain'
import anechoic from './decorators/anechoic'

export default class Router {
  constructor (routes = new Map()) {
    this.routes = new Map()
    for (const [pattern, handler] of routes) this.route(pattern, handler)
    window::on('popstate', event => this.trigger(window.location))
    document.addEventListener('click', event => {
      const targets = ['target', 'relatedTarget', 'currentTarget', 'srcElement']
      function isLink (target) {
        return target && target.tagName === 'A'
      }
      const link = targets.map(target => event[target]).find(isLink)
      event.preventDefault()
      if (link && link.origin === window.location.origin) {
        event.preventDefault()
        window.history.pushState(null, '', link.href)
        this.trigger(link)
      }
    })
  }

  @chain
  route (pattern, handler) {
    const template = uriTemplates(pattern)
    const predicate = template.fromUri
    this.routes.set(predicate, handler)
  }

  @chain
  @anechoic
  trigger (url = '') {
    const path = typeof url === 'string'
      ? url
      : url.pathname + url.search + url.hash
    for (const [predicate, handler] of this.routes.entries()) {
      const params = predicate(path)
      if (params) {
        handler(params)
        break
      }
    }
  }
}
