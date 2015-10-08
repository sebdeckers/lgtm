import status from '../../services/github/status'

export default async ({ payload: {
  action, number,
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
  console.log(`Pull request ${ user }/${ repo }#${ number } ${ action } by ${ contributor }`)
  if (!(action === 'opened' || action === 'synchronize')) throw Error('Not a new or synced pull request')
  return status(user, repo, sha, 'pending')
}
