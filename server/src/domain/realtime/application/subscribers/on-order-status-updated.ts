import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { OnlineUsersRepository } from '../repositories/online-users.repository'
import { SocketProvider } from '../providers/socket.provider'
import { OrderStatusUpdated } from '@/domain/app/enterprise/events/order-status-updated.event'

export class OnOrderStatusUpdated implements EventHandler {
  constructor(
    private onlineUsersRepository: OnlineUsersRepository,
    private socketProvider: SocketProvider
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.emitOrderStatusUpdatedSocketEvent.bind(this),
      OrderStatusUpdated.name
    )
  }

  private async emitOrderStatusUpdatedSocketEvent({
    order
  }: OrderStatusUpdated) {
    const onlineUsers = await this.onlineUsersRepository.getAll()

    for (const onlineUser of onlineUsers) {
      await this.socketProvider.emitTo(
        onlineUser.socketId,
        'order-status-updated',
        order
      )
    }
  }
}
