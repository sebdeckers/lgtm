/* eslint-disable no-unused-vars */
import webcomponents from 'webcomponents.js'
import dom4 from 'dom4'
/* eslint-enable */

import Choreographer from './choreographer'
import loginElement from './components/Login'

export const choreographer = new Choreographer(document.body, [
  ['/', { tagName: 'lgtm-login', element: loginElement }],
  ['/foo{?bar,test}', { tagName: 'pre' }]
])
