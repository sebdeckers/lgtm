import * as config from './config'
import http from 'http'
import express from 'express'
import morgan from 'morgan'
import githubWebhookHandler from 'github-webhook-handler'
import escapeStringRegexp from 'escape-string-regexp'

const app = express()
app.use(morgan(config.logFormat))

const handler = githubWebhookHandler(config.github)
app.use(handler)
handler.on('*', event => {
  console.log(`webhook received: ${ event.event }`)
})

const votes = ['+1', ':+1:', '-1', ':-1:']
  .map(pattern => new RegExp(escapeStringRegexp(pattern) + '(\\s|$)', 'm'))

handler.on('issue_comment', ({ payload: { action, issue, comment } }) => {
  if (action !== 'created') return
  if (!issue.pull_request) return
  if (!votes.some(vote => vote.test(comment.body))) return
  console.log(`#${ issue.number } @${ comment.user.login }: ${ comment.body }`)
})

app.set('port', config.port)
http
  .createServer(app)
  .listen(app.get('port'))
console.log(`Listening on port ${ app.get('port') }`)
