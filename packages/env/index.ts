import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),

    SERVER_PORT: z.coerce.number().default(3333),

    // JWT_SECRET: z.string(),
  },
  client: {},
  shared: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,

    SERVER_PORT: process.env.PORT,

    // JWT_SECRET: process.env.JWT_SECRET,
  },
  emptyStringAsUndefined: true,
})
