import express from 'express'
import path from 'path'

const directory = [__dirname, '..', '..', '..', 'frontend']
export default express.static(path.join(...directory))
