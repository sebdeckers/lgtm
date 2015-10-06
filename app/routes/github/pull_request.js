import config from '../../config'
import GitHubApi from 'github'

export default ({ payload: {
  action,
  number,
  pull_request: {
    head: {
      sha,
      user: { login: contributor },
      repo: {
        name: repo,
        owner: { login: user }
      }
    }
  }
} }) => {
  if (action !== 'opened') return
  console.log(`Pull request ${ user }/${ repo }#${ number } ${ action } by ${ contributor }`)
  console.log({ user, repo, sha })
  var github = new GitHubApi({
    debug: config.github.api.debug,
    version: config.github.api.version
  })
  github.authenticate({
    token: config.github.oauthToken,
    type: 'oauth'
  })
  // github.statuses.create({
  //   user: ,
  //   repo: ,
  //   sha: ,
  //   state: 'pending',
  //   target_url: config.github.application.url,
  //   description: 'Pending a supporting vote',
  //   context: config.github.application.context
  // }, (err, result) => {})
}
