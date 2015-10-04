import escapeStringRegexp from 'escape-string-regexp'

const votes = ['+1', ':+1:', 'lgtm', '-1', ':-1:']
  .map(escapeStringRegexp)
  .map(pattern => new RegExp(pattern + '(\\s|$)', 'im'))

export default ({ payload: { action, issue, comment } }) => {
  if (action !== 'created') return
  if (!issue.pull_request) return
  if (!votes.some(vote => vote.test(comment.body))) return
  console.log(`#${ issue.number } @${ comment.user.login }: ${ comment.body }`)
}
