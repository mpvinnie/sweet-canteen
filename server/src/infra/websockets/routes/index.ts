import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OnlineUser } from '@/domain/realtime/enterprise/entities/online-user'
import { RedisOnlineUsersRepository } from '@/infra/websockets/repositories/redis-online-users.repository'
import { WebSocket } from '@fastify/websocket'
import { FastifyInstance, FastifyRequest } from 'fastify'
import { wsJWTVerify } from '../middlewares/ws-jwt-verify'

export async function websocketRoutes(app: FastifyInstance) {
  app.get(
    '/',
    { websocket: true, preValidation: [wsJWTVerify] },
    async (socket: WebSocket, request: FastifyRequest) => {
      const onlineUsersRepository = new RedisOnlineUsersRepository()

      try {
        const socketId = new UniqueEntityID().toString()

        const onlineUser = OnlineUser.create({
          socketId,
          userId: new UniqueEntityID(request.user.sub),
          role: request.user.role
        })

        await onlineUsersRepository.add(onlineUser)

        console.log(`🟢 Socket connected with id ${socketId}`)
      } catch (err) {
        console.log('Invalid token on socket:', err)
        socket.close()
      }

      socket.on('close', async () => {
        try {
          await onlineUsersRepository.removeByUserId(request.user.sub)
        } catch (err) {
          socket.close()
        }
      })
    }
  )
}
