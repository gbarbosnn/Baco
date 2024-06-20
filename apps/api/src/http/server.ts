import { env } from '@saas/env'

import { app } from './app'

app
  .listen({
    port: env.SERVER_PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP Server Running on localhost:${env.SERVER_PORT}`)
  })
