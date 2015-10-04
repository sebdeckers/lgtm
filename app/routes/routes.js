import express from 'express'
import github from './github'

const router = express.Router()
router.use(github)
export default router
