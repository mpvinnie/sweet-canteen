import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OnOrderCreated } from '@/domain/realtime/application/subscribers/on-order-created'
import { OnlineUser } from '@/domain/realtime/enterprise/entities/online-user'
import { RedisOnlineUsersRepository } from '@/infra/cache/redis/repositories/redis-online-users.repository'
import { WebSocketProvider } from '@/infra/providers/web-socket-provider'
import { WebSocket } from '@fastify/websocket'
import { FastifyInstance, FastifyRequest } from 'fastify'
import { wsJWTVerify } from '../middlewares/ws-jwt-verify'

export async function websocketRoutes(app: FastifyInstance) {
  const onlineUsersRepository = new RedisOnlineUsersRepository()
  const socketProvider = new WebSocketProvider()
  new OnOrderCreated(onlineUsersRepository, socketProvider)

  app.get(
    '/',
    { websocket: true, preValidation: [wsJWTVerify] },
    async (socket: WebSocket, request: FastifyRequest) => {
      const socketId = new UniqueEntityID().toString()

      try {
        const onlineUser = OnlineUser.create({
          socketId,
          userId: new UniqueEntityID(request.user.sub),
          role: request.user.role
        })

        socketProvider.addSocket(socketId, socket)

        await onlineUsersRepository.add(onlineUser)

        console.log(`🟢 Socket connected with id ${socketId}`)
      } catch (err) {
        console.log('Invalid token on socket:', err)
        socket.close()
      }

      socket.on('close', async () => {
        try {
          socketProvider.removeSocket(socketId)
          await onlineUsersRepository.removeByUserId(request.user.sub)
        } catch (err) {
          socket.close()
        }
      })
    }
  )
}
