import Router from './router'

function onRoute (params, { element, tagName }) {
  try {
    document.registerElement(tagName, element)
  } catch (error) {}
  const scene = document.createElement(tagName)
  Object.assign(scene.dataset, params)
  // TODO Add asynchronous transition management.
  this.stage.appendChild(scene)
}

export default class extends Router {
  constructor (stage, scenes) {
    const routes = new Map()
    for (const [pattern, opts] of new Map(scenes).entries()) {
      const handler = params => this::onRoute(params, opts)
      routes.set(pattern, handler)
    }
    super(routes)
    this.stage = stage
  }
}
