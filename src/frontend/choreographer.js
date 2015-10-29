import Router from './router'

export default class extends Router {
  constructor () {
    super(...arguments)
    console.log('places, everyone!')
  }
}
