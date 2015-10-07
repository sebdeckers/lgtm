import config from '../../config'
import GitHubApi from 'github'
import bluebird from 'bluebird'

export default (user, repo) => {
  const github = new GitHubApi({
    debug: config.github.api.debug,
    version: config.github.api.version
  })
  github.authenticate({
    token: config.github.oauthToken,
    type: 'oauth'
  })
  bluebird.promisifyAll(github.statuses)
  return github
}
