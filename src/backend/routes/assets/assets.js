import express from 'express'
import fallback from 'express-history-api-fallback'
import { nearestSync } from 'nearest-file-path'

const router = new express.Router()
const root = nearestSync('dist')
router.use(express.static(root))
router.use(fallback('index.html', { root }))
export default router
