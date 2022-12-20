import { Order, OrderItem, OrderRepositoryInterface } from '@/domain/checkout'
import OrderModel from './order-model'
import OrderItemModel from './order-item-model'

export default class OrderRepository implements OrderRepositoryInterface {
  async create (entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customer_id,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.product_id,
          quantity: item.quantity
        }))
      },
      {
        include: [{ model: OrderItemModel }]
      }
    )
  }

  async update (entity: Order): Promise<void> {
    await OrderModel.update({
      id: entity.id,
      customer_id: entity.customer_id,
      total: entity.total()
    }, {
      where: {
        id: entity.id
      }
    })

    entity.items.map((item) => {
      OrderItemModel.upsert({
        id: item.id,
        name: item.name,
        order_id: entity.id,
        price: item.price,
        product_id: item.product_id,
        quantity: item.quantity
      })

      return null
    })
  }

  async find (id: string): Promise<Order> {
    let orderModel: OrderModel

    try {
      orderModel = await (await OrderModel.findOne({ where: { id }, include: ['items'], rejectOnEmpty: true })).toJSON()
    } catch (error) {
      throw new Error('Order not found')
    }

    const orderItems = orderModel.items.map((item) => new OrderItem(
      item.id,
      item.name,
      item.price,
      item.product_id,
      item.quantity
    ))

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderItems
    )
  }

  async findAll (): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ['items'] })

    const orders = orderModels.map((orderModel) => {
      const orderItems = orderModel.items.map((item) => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      ))

      return new Order(
        orderModel.id,
        orderModel.customer_id,
        orderItems
      )
    })

    return orders
  }
}
