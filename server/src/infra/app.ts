import fastifyJwt from '@fastify/jwt'
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
app.register(fastifyWebsocket)

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
