import express from 'express'
import { nearestSync } from 'nearest-file-path'

const directory = nearestSync('dist')
export default express.static(directory)
