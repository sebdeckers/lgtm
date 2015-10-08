import config from '../../config'
import status from '../../services/github/status'
import escapeStringRegexp from 'escape-string-regexp'
import client from '../../services/github/client'

const toRegex = patterns => patterns
  .map(escapeStringRegexp)
  .map(pattern => new RegExp(pattern + '(\\s|$)', 'im'))

const votes = new Map([
  ['success', toRegex(['+1', ':+1:', 'lgtm', ':shipit:', ':squirrel:'])],
  ['failure', toRegex(['-1', ':-1:'])]
])

function getState(body) {
  for (const [state, patterns] of votes.entries())
    if (patterns.some(pattern => pattern.test(body)))
      return state
}

async function getSha(user, repo, number) {
  const github = new client(user, repo)
  const commits = await github.pullRequests.getCommitsAsync({
    user, repo, number,
    page: 1, per_page: 1
  })
  // const [{ sha: head }] = await github.getLastPageAsync(commits)
  const [{ sha: head }] = commits
  return head
}

async function getStatus(user, repo, sha) {
  const github = new client(user, repo)
  const statuses = await github.statuses.getAsync({ user, repo, sha })
  return statuses.some(({ context }) => context === config.github.branding.context)
}

export default async ({ payload: {
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
  console.log(`${ user }/${ repo }#${ number } @${ author }: ${ body }`)
  if (action !== 'created') throw Error('Not a new comment')
  if (!pull_request) throw Error('Not a pull request')
  const state = getState(body)
  if (!state) throw Error('Not a vote')
  const sha = await getSha(user, repo, number)
  if (!await getStatus(user, repo, sha)) throw Error(`No status found for ${ sha }`)
  status(user, repo, sha, state)
}
