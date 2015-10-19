import config from '../../config'
import urltemplate from 'url-template'
import Client from './client'

const descriptions = new Map([
  ['pending', 'Pending a supporting vote'],
  ['success', 'OK. Looks good to me!'],
  ['error', 'Oops... something went wrong!'],
  ['failure', 'Rejected']
])

export default async (user, repo, sha, state) => {
  const result = await new Client(user, repo)
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
  console.log(`${ user }/${ repo }@${ sha } State changed to ${ state }`)
  return result
}
