export interface SocketProvider {
  emitTo(socketId: string, event: string, data: any): Promise<void>
}
