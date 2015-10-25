/* eslint-disable no-unused-vars */
import webcomponents from 'webcomponents.js'
import dom4 from 'dom4'
/* eslint-enable */

import Router from './router'
import loginElement from './components/Login'

new Router()
  .route('/', url => {
    const Login = document.registerElement('lgtm-login', loginElement)
    const login = new Login()
    document.body.appendChild(login)
  })
