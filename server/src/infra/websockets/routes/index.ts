import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OnOrderCreated } from '@/domain/realtime/application/subscribers/on-order-created'
import { RedisOnlineUsersRepository } from '@/infra/cache/redis/repositories/redis-online-users.repository'
import { makeConnectUserUseCase } from '@/infra/factories/make-connect-user'
import { makeDisconnectUserUseCase } from '@/infra/factories/make-disconnect-user'
import { WebSocketProvider } from '@/infra/providers/web-socket-provider'
import { WebSocket } from '@fastify/websocket'
import { FastifyInstance, FastifyRequest } from 'fastify'
import { wsJWTVerify } from '../middlewares/ws-jwt-verify'

export async function websocketRoutes(app: FastifyInstance) {
  const onlineUsersRepository = new RedisOnlineUsersRepository()
  const socketProvider = new WebSocketProvider()
  const connectUser = makeConnectUserUseCase()
  const disconnectUser = makeDisconnectUserUseCase()
  new OnOrderCreated(onlineUsersRepository, socketProvider)

  app.get(
    '/',
    { websocket: true, preValidation: [wsJWTVerify] },
    async (socket: WebSocket, request: FastifyRequest) => {
      const socketId = new UniqueEntityID().toString()

      try {
        await connectUser.execute({
          socketId: socketId,
          userId: request.user.sub,
          role: request.user.role
        })

        socketProvider.addSocket(socketId, socket)

        console.log(`🟢 Socket connected with id ${socketId}`)
      } catch (err) {
        console.log('Invalid token on socket:', err)
        socket.close()
      }

      socket.on('close', async () => {
        try {
          socketProvider.removeSocket(socketId)

          await disconnectUser.execute({
            socketId: socketId
          })
        } catch (err) {
          socket.close()
        }
      })
    }
  )
}
