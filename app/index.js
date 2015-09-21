import http from 'http'
import express from 'express'

const app = express()

app.set('port', process.env.PORT || 3000)

http
  .createServer(app)
  .listen(app.get('port'))

console.log(`Listening on port ${app.get('port')} ...`)
