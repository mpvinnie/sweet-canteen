import { SocketProvider } from '@/domain/realtime/application/providers/socket.provider'

type EmittedEvent = {
  socketId: string
  event: string
  data: any
}

export class FakeSocketProvider implements SocketProvider {
  public emitted: EmittedEvent[] = []

  async emitTo(socketId: string, event: string, data: any) {
    this.emitted.push({
      socketId,
      event,
      data
    })
  }
}
