const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

export const port = process.env.PORT || 3000
export const logFormat = isDevelopment ? 'dev' : 'combined'
export const github = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  webhook: {
    path: '/github/webhook'
  },
  api: {
    debug: true,
    version: '3.0.0'
  }
}
