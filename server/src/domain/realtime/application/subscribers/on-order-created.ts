import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { OrderCreatedEvent } from '@/domain/app/enterprise/events/order-created.event'
import { SocketProvider } from '../providers/socket.provider'
import { OnlineUsersRepository } from '../repositories/online-users.repository'

export class OnOrderCreated implements EventHandler {
  constructor(
    private onlineUsersRepository: OnlineUsersRepository,
    private socketProvider: SocketProvider
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.emitNewOrderSocketEvent.bind(this),
      OrderCreatedEvent.name
    )
  }

  private async emitNewOrderSocketEvent({ order }: OrderCreatedEvent) {
    const onlineCooks = await this.onlineUsersRepository.getAllByRole('cook')

    for (const onlineCook of onlineCooks) {
      await this.socketProvider.emitTo(onlineCook.socketId, 'new-order', order)
    }
  }
}
