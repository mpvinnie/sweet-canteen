import { Either, left, right } from '@/core/either'
import { Order } from '../../enterprise/entities/order'
import { AttendantsRepository } from '../repositories/attendants.repository'
import { ProductsRepository } from '../repositories/products.repository'
import { InsufficientStockError } from './errors/insufficient-stock.error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrderItem } from '../../enterprise/entities/orderItem'
import { OrdersRepository } from '../repositories/orders.repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface RegisterOrderUseCaseRequest {
  attendantId: string
  customerName: string
  observation?: string
  items: Array<{
    productId: string
    quantity: number
  }>
}

type RegisterOrderUseCaseResponse = Either<
  ResourceNotFoundError | InsufficientStockError,
  {
    order: Order
  }
>

export class RegisterOrderUseCase {
  constructor(
    private attendantsRepository: AttendantsRepository,
    private productsRepository: ProductsRepository,
    private ordersRepository: OrdersRepository
  ) {}

  async execute({
    attendantId,
    customerName,
    observation,
    items
  }: RegisterOrderUseCaseRequest): Promise<RegisterOrderUseCaseResponse> {
    const attendant = await this.attendantsRepository.findById(attendantId)

    if (!attendant) {
      return left(new ResourceNotFoundError())
    }

    const productIds = items.map(item => item.productId)
    const products = await this.productsRepository.findManyByIds(productIds)

    const productMap = new Map(
      products.map(product => [product.id.toString(), product])
    )

    for (const item of items) {
      const product = productMap.get(item.productId)

      if (!product) {
        return left(new ResourceNotFoundError())
      }

      if (product.availableQuantity < item.quantity) {
        return left(new InsufficientStockError(product.name))
      }
    }

    for (const item of items) {
      const product = productMap.get(item.productId)!

      product.availableQuantity -= item.quantity
    }

    const orderId = new UniqueEntityID()

    const orderItems = items.map(item => {
      const product = productMap.get(item.productId)!

      return OrderItem.create({
        orderId,
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        unitPriceInCents: product.priceInCents
      })
    })

    const order = Order.create({
      attendantId: attendant.id,
      customerName,
      observation,
      orderItems
    })

    for (const product of productMap.values()) {
      await this.productsRepository.save(product)
    }

    await this.ordersRepository.create(order)

    return right({
      order
    })
  }
}
