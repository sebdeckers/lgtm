/* global HTMLElement WebComponents */
import config from '../../config'
import { on } from 'bubbly'
import Auth0 from 'auth0-js'
import insertCss from 'insert-css'
import template from './Login.html'
import styles from './Login.css'

export default class Login extends HTMLElement {
  createdCallback () {
    const root = this.createShadowRoot()
    root.innerHTML = template
    insertCss(styles, { parent: root })
    if (WebComponents.ShadowCSS) {
      WebComponents.ShadowCSS.shimStyling(root, this.tagName)
    }
    this.shadowRoot.querySelector('button')::on('click', event => {
      new Auth0(config.auth0).login({ connection: 'github' })
    })
  }
}
