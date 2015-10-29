/* eslint-disable no-unused-vars */
import webcomponents from 'webcomponents.js'
import dom4 from 'dom4'
/* eslint-enable */

import Choreographer from './choreographer'
import loginElement from './components/Login'

export const choreographer = new Choreographer([
  ['/', () => {
    try {
      document.registerElement('lgtm-login', loginElement)
    } catch (error) {}
    const login = document.createElement('lgtm-login')
    document.body.appendChild(login)
  }],
  ['/foo{?bar,test}', params => {
    const message = document.createElement('pre')
    message.textContent = `Hey it worked! \n ${JSON.stringify(params, null, 2)}`
    document.body.appendChild(message)
  }]
])
