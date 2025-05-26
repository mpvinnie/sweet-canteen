import { OrderStatus } from './order'

const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  pending: ['processing', 'on_hold', 'canceled'],
  processing: ['finished', 'on_hold', 'canceled'],
  on_hold: ['processing', 'canceled'],
  canceled: [],
  finished: ['completed'],
  completed: []
}

export function canTransition(current: OrderStatus, next: OrderStatus) {
  return allowedTransitions[current].includes(next)
}
