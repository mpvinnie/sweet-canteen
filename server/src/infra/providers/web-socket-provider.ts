import { SocketProvider } from '@/domain/realtime/application/providers/socket.provider'
import { WebSocket } from '@fastify/websocket'

export class WebSocketProvider implements SocketProvider {
  private sockets = new Map<string, WebSocket>()

  addSocket(socketId: string, socket: WebSocket) {
    this.sockets.set(socketId, socket)
  }

  removeSocket(socketId: string) {
    this.sockets.delete(socketId)
  }

  async emitTo(socketId: string, event: string, data: any) {
    const socket = this.sockets.get(socketId)

    if (!socket || socket.readyState !== socket.OPEN) return

    const payload = JSON.stringify({ event, data })
    socket.send(payload)
  }
}
