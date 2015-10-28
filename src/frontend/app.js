/* eslint-disable no-unused-vars */
import webcomponents from 'webcomponents.js'
import dom4 from 'dom4'
/* eslint-enable */

import Router from './router'
import loginElement from './components/Login'

new Router()
  .route('/', params => {
    try {
      document.registerElement('lgtm-login', loginElement)
    } catch (error) {}
    const login = document.createElement('lgtm-login')
    document.body.appendChild(login)
  })
  .route('/foo{?bar,test}', params => {
    const message = document.createElement('pre')
    message.textContent = `Hey it worked! \n ${JSON.stringify(params, null, 2)}`
    document.body.appendChild(message)
  })
