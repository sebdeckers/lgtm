import config from '../../config'
import urltemplate from 'url-template'
import client from './client'

const descriptions = new Map([
  ['pending', 'Pending a supporting vote'],
  ['success', 'OK. Looks good to me!'],
  ['error', 'Oops... something went wrong!'],
  ['failure', 'Rejected']
])

export default (user, repo, sha, state) =>
  new client(user, repo)
    .statuses.createAsync({
      user, repo, sha, state,
      context: config.github.branding.context,
      description: descriptions.get(state),
      target_url: urltemplate
        .parse('{+base}/votes/github{/user,repo,sha}')
        .expand({
          user, repo, sha,
          base: config.github.branding.url
        })
    })
