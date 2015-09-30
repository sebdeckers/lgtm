const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

export const port = process.env.PORT || 3000
export const logFormat = isDevelopment ? 'dev' : 'combined'
