import status from '../../services/github/status'
import escapeStringRegexp from 'escape-string-regexp'

const toRegex = patterns => patterns
  .map(escapeStringRegexp)
  .map(pattern => new RegExp(pattern + '(\\s|$)', 'im'))

const votes = new Map([
  ['success', toRegex(['+1', ':+1:', 'lgtm', ':shipit:', ':squirrel:'])],
  ['failure', toRegex(['-1', ':-1:'])]
])

export default ({ payload: {
  action,
  issue: { pull_request, number },
  comment: {
    body,
    user: { login: author }
  },
  repository: {
    name: repo,
    owner: { login: user }
  }
} }) => {
  if (action !== 'created') return
  if (!pull_request) return
  console.log(`#${ number } @${ author }: ${ body }`)
  const sha = '1234567890abcdef' // TODO: get the latest commit for this PR and check if it has a status
  for (const [state, patterns] of votes.entries())
    if (patterns.some(pattern => pattern.test(body)))
      status(user, repo, sha, state)
}
