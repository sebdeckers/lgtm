import { port, logFormat } from './config'
import http from 'http'
import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(morgan(logFormat))

app.set('port', port)

http
  .createServer(app)
  .listen(app.get('port'))

console.log(`Listening on port ${ app.get('port') } ...`)
