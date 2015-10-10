import express from 'express'
import github from './github'
import assets from './assets'

const router = express.Router()
router.use(github)
router.use(assets)
export default router
