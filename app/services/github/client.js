import config from '../../config'
import GitHubApi from 'github'
import bluebird from 'bluebird'

export default class extends GitHubApi {
  constructor (user, repo) {
    super({
      debug: config.github.api.debug,
      version: config.github.api.version
    })
    this.authenticate({
      token: config.github.oauthToken,
      type: 'oauth'
    })
    bluebird.promisifyAll(this.repos)
    bluebird.promisifyAll(this.statuses)
    bluebird.promisifyAll(this.pullRequests)
    bluebird.promisifyAll(this, { filter: (name, func, target, passesDefaultFilter) =>
      passesDefaultFilter && /Page$/.test(name)
    })
  }
}
