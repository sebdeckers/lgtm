/* eslint-disable no-unused-vars */
import webcomponents from 'webcomponents.js'
import dom4 from 'dom4'
/* eslint-enable */
import loginElement from './components/Login'

const Login = document.registerElement('lgtm-login', loginElement)
const login = new Login()
document.body.appendChild(login)
