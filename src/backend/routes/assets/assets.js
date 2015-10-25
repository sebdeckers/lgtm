import express from 'express'
import { nearestSync } from 'nearest-file-path'

const directory = nearestSync('dist')

const router = new express.Router()
router.use(express.static(directory))
router.use((req, res, next) => res.sendFile('index.html', { root: directory }))
export default router
