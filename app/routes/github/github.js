import * as config from '../../config'
import express from 'express'
import githubWebhookHandler from 'github-webhook-handler'
import issue_comment from './issue_comment'
import pull_request from './pull_request'
import wildcard from './wildcard'

const handler = githubWebhookHandler(config.github)
handler.on('*', wildcard)
handler.on('issue_comment', issue_comment)
handler.on('pull_request', pull_request)

const router = express.Router()
router.use(handler)
export default router
