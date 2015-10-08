const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

export default {
  express: {
    port: process.env.PORT || 3000,
    logFormat: isDevelopment ? 'dev' : 'combined'
  },
  github: {
    oauthToken: process.env.GITHUB_OAUTH_TOKEN,
    application: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    },
    branding: {
      context: 'code-review/lgtm',
      url: 'https://lgtm.cf.sg'
    },
    webhook: {
      path: '/github/webhook',
      secret: process.env.GITHUB_WEBHOOK_SECRET
    },
    api: {
      debug: false,
      version: '3.0.0'
    }
  }
}
