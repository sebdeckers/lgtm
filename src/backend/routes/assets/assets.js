import express from 'express'
import { nearestSync } from 'nearest-file-path'

const router = new express.Router()
const root = nearestSync('dist')
router.use(express.static(root))
router.get((req, res) => {
  if (req.accepts('html')) {
    res.sendFile('index.html', { root })
  }
})
export default router
