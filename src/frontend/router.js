/* global URL location */
import { on } from 'bubbly'

function pathNames (url) {
  return url.length > 0
    ? url.pathname.substring(1).split('/')
    : []
}

function paramNames (url) {
  return url.length > 0
    ? url.search // Polyfill: url.searchParams.toString()
      .split('&')
      .map(pair => pair.split('=', 1))
    : []
}

function match (pattern) {
  const patternSlugs = pathNames(pattern)
  const patternParams = paramNames(pattern)
  return url => {
    const urlSlugs = pathNames(url)
    const urlParams = paramNames(url)
    return urlSlugs.every(
      (slug, index) =>
        slug.at(0) === ':' ||
        slug === patternSlugs[index]
    ) &&
    patternParams.every(
      param => urlParams.includes(param)
    )
  }
}

export default class Router {
  constructor (base = location.origin) {
    this.base = base
    this.routes = new Map()

    window::on('popstate', event => {
      const url = new URL(location)
      for (const [predicate, handler] of this.routes.entries()) {
        if (predicate(url)) {
          handler(url)
          break
        }
      }
    })
  }

  route (pattern, handler) {
    const parsed = new URL(pattern, this.base)
    const predicate = match(parsed)
    this.routes.set(predicate, handler)
    return this
  }
}
