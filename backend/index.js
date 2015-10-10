import config from './config'
import http from 'http'
import express from 'express'
import morgan from 'morgan'
import routes from './routes'

const app = express()
  .use(morgan(config.express.logFormat))
  .use(routes)
  .set('port', config.express.port)
http
  .createServer(app)
  .listen(app.get('port'))
console.log(`Listening on port ${ app.get('port') }`)
