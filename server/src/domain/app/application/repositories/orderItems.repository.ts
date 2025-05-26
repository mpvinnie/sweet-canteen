export interface OrderItemsRepository {
  deleteManyByOrderId(orderId: string): Promise<void>
}
