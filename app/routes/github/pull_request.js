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
  if (action !== 'opened') return
  console.log(`Pull request ${ user }/${ repo }#${ number } ${ action } by ${ contributor }`)
  const result = await status(user, repo, sha, 'pending')
  console.log('ok!', result)
}
