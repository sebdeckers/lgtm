import config from '../../config'
import express from 'express'
import githubWebhookHandler from 'github-webhook-handler'
import issue_comment from './issue_comment'
import pull_request from './pull_request'
import wildcard from './wildcard'

function log(fn) {
  return (...args) => {
    const retval = this::fn(...args)
    retval.catch(::console.log)
    return retval
  }
}

const handler = githubWebhookHandler({
  path: config.github.webhook.path,
  secret: config.github.webhook.secret
})
handler.on('*', wildcard)
handler.on('issue_comment', log(issue_comment))
handler.on('pull_request', log(pull_request))

const router = express.Router()
router.use(handler)
export default router
