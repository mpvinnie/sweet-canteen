import uploadConfig from '@/core/config/upload'
import fastifyJwt from '@fastify/jwt'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import fastifyWebsocket from '@fastify/websocket'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { appRoutes } from './http/routes'
import { websocketRoutes } from './websockets/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})
app.register(fastifyStatic, {
  root: uploadConfig.uploadFolder,
  prefix: `/${env.STORAGE_BUCKET}/`
})
app.register(fastifyWebsocket)
app.register(fastifyMultipart)

app.register(appRoutes)
app.register(websocketRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // should log to an external tool
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
