import { FastifyReply, FastifyRequest } from 'fastify'

export async function wsJWTVerify(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const token = request.headers['sec-websocket-protocol']

    if (!token) {
      throw new Error('Token not provided.')
    }

    const originalAuthHeader = request.headers.authorization
    request.headers.authorization = `Bearer ${token}`

    await request.jwtVerify()

    request.headers.authorization = originalAuthHeader
  } catch (err) {
    if (request.socket) {
      request.socket.end()
    } else {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
